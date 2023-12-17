import { useContext } from "react";
import { TodoContext } from "../providers/TodoProvider";

export const useTodos = () => {
  const context = useContext(TodoContext);
  return context;
};
