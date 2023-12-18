import axios from "axios";
import { Todo } from "../types";

const BASE_URL = "http://localhost:5050/api/duties";

export const getTodos = async () => {
  const response = await axios.get<Todo[]>(BASE_URL);
  return response.data;
};

export const createTodo = async (name: string) => {
  const response = await axios.post<Todo>(BASE_URL, {
    name,
  });
  return response.data;
};

export const updateTodo = async (todo: Todo) => {
  const response = await axios.put<Todo>(`${BASE_URL}/${todo.id}`, {
    name: todo.name,
  });
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
