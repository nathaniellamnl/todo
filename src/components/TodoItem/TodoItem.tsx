import React from "react";
import { Todo } from "../../types";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
}

const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  return (
    <li className={todo.completed ? styles.completed : ""}>
      {todo.text}
      <button onClick={() => toggleTodo(todo.id)}>
        {todo.completed ? "Mark as incomplete" : "Mark as complete"}
      </button>
    </li>
  );
};

export default TodoItem;
