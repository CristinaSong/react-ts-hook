import React, { useState } from 'react';

export default function Example() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(18);
  const [fruit, setFruit] = useState('orange');
  const [todos, setTodos] = useState([
    { text: 'Learn Hooks' },
    { text: 'Learn React' },
  ]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>

      <p>I am {age} years old</p>
      <button onClick={() => setAge(age + 1)}>age</button>

      <p>{fruit}</p>
      <button
        onClick={() => {
          setFruit('apple');
        }}
      >
        fruit
      </button>
      <hr />
      {/* 保存数组状态 */}
      {todos.map((item) => (
        <div key={item.text}>{item.text}</div>
      ))}
      <button
        onClick={() => {
          setTodos([...todos, { text: 'Learn TS' }]);
        }}
      >
        todos
      </button>
    </div>
  );
}
