import axios from "axios";
import { Todo } from "../types";

const BASE_URL = "http://localhost:5050/api/duties";

export const getTodos = async () => {
  try {
    const response = await axios.get<Todo[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const createTodo = async (name: string) => {
  try {
    const response = await axios.post<Todo>(BASE_URL, { name });
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
