import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { ITodo, IProps, TRemoveTodo } from './interface';
import './style.css';

let idSeq = Date.now();
const LS_KEY = '_$-todos_';

const Control = memo(function Control(props: Pick<IProps, 'addTodo'>) {
  const { addTodo } = props;
  const inputRef = useRef();

  // onSubmit没有向子组件传递，所以不需要用useCallback包起来
  const onSubmit = (e) => {
    // 阻止默认行为
    e.preventDefault();

    const newText = inputRef.current.value.trim();

    if (newText.length === 0) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false,
    });

    // 置空
    inputRef.current.value = '';
  };

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  );
});

const TodoItem = memo(function TodoItem(
  props: Pick<IProps, 'todo' | 'removeTodo' | 'toggleTodo'>
) {
  const { todo, toggleTodo, removeTodo } = props;
  const { id, text, complete } = todo;
  const onChange = () => {
    toggleTodo(id);
  };
  const onRemove = () => {
    removeTodo(id);
  };

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  );
});

/**
 * todo列表
 */
const Todos = memo(function Todos(
  props: Pick<IProps, 'todos' | 'removeTodo' | 'toggleTodo'>
) {
  const { todos, toggleTodo, removeTodo } = props;
  return (
    <ul className="todos">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        );
      })}
    </ul>
  );
});

export default function TodoList() {
  console.log(1);

  const [todos, setTodos] = useState([]);
  // 从代码优化的角度需要将函数用useCallback包裹起来, setState不需要放在依赖数组
  const addTodo = useCallback((todo) => {
    setTodos((todos) => [...todos, todo]);
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos((todos) =>
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  }, []);

  // 切换待办状态
  const toggleTodo = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        return todo.id === id
          ? {
              ...todo,
              complete: !todo.complete,
            }
          : todo;
      })
    );
  }, []);

  // 这里要注意副作用的执行顺序，先读数组再写，否则一开始刷新写入的是空数组，读的也是空数组

  // 在磁盘上读取todo数组, 程序启动执行一次即可
  // React18的新特性：将useEffect设置为执行两次，解决方案通过变量控制只执行一次
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      console.log('111', todos);
      setTodos(todos);
    }
    return () => {
      ignore = true;
    };
  }, []);

  // 写todo数组到磁盘上;
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control addTodo={addTodo} />
      <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
}
