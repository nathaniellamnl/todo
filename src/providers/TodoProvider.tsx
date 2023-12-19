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
  removeTodo: (id: number) => void;
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data || []))
      .catch((_) => {
        console.error("Error! The todo list could not be fetched");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const editTodo = (todo: Todo) => {
    const newTodos = todos.map((clonedTodo) =>
      todo.id === clonedTodo.id ? todo : clonedTodo
    );
    setTodos(newTodos);
  };

  const removeTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{ todos, isLoading, addTodo, editTodo, removeTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
