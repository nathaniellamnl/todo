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
  addTodo: (todo: Todo) => void;
  isLoading: boolean;
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

  return (
    <TodoContext.Provider value={{ todos, addTodo, isLoading }}>
      {children}
    </TodoContext.Provider>
  );
};
