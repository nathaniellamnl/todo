import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import * as useTodos from "../../hooks/useToDos";
import matchMediaMock from "../../mocks/matchMedia.mock";
import "@testing-library/jest-dom";
matchMediaMock();

describe("TodoList", () => {
  it("displays spinner when loading", () => {
    jest.spyOn(useTodos, "useTodos").mockImplementationOnce(() => ({
      todos: [],
      isLoading: true,
      addTodo: () => {},
      removeTodo: () => {},
      editTodo: () => {},
    }));
    render(<TodoList />);
    expect(screen.getByTestId("spin")).toBeInTheDocument();
  });

  it("displays todo items when not loading", () => {
    const mockTodos = [
      {
        createdAt: "2023-12-14T22:19:09.270Z",
        id: 1,
        name: "Test Todo",
        updatedAt: "2023-12-15T02:31:00.146Z",
      },
    ];
    jest.spyOn(useTodos, "useTodos").mockImplementationOnce(() => ({
      todos: mockTodos,
      isLoading: false,
      addTodo: () => {},
      removeTodo: () => {},
      editTodo: () => {},
    }));
    render(<TodoList />);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });
});
