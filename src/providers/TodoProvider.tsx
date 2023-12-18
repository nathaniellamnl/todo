import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { Todo } from "../types";
import { getTodos } from "../client-requests";

interface ITodoContext {
  todos: Todo[];
  isLoading: boolean;
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data || []))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const editTodo = (todo: Todo) => {
    const clonedTodos = [...todos];
    const newTodos = clonedTodos.map((clonedTodo) =>
      todo.id === clonedTodo.id ? todo : clonedTodo
    );
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, isLoading, addTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
