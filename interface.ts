export interface ITodo {
  id: number;
  text: string;
  complete: boolean;
}

export type TAddTodo = (todo: ITodo) => void;
export type TRemoveTodo = (id: number) => boolean;
export type TToggleTodo = (id: number) => void;

export interface IProps {
  todo: ITodo;
  todos: ITodo[];
  addTodo: TAddTodo;
  removeTodo: TRemoveTodo;
  toggleTodo: TToggleTodo;
}
