import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { Todo } from "../types";

interface ToDoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
}

const TodoList = ({ todos, toggleTodo }: ToDoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
