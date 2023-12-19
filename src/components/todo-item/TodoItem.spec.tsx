import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import matchMediaMock from "../../mocks/matchMedia.mock";
import * as clientRequests from "../../client-requests";
import "@testing-library/jest-dom";
import TodoItem from "./TodoItem";
matchMediaMock();

jest.mock("../../hooks/useToDos", () => ({
  useTodos: jest.fn(() => ({
    editTodo: jest.fn(),
    removeTodo: jest.fn(),
  })),
}));
jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  return {
    ...antd,
    message: {
      useMessage: jest.fn(() => [
        {
          open: jest.fn(),
        },
        <div></div>,
      ]),
    },
  };
});

describe("TodoItem", () => {
  const mockTodo = {
    createdAt: "2023-12-14T22:19:09.270Z",
    id: 1,
    name: "Test Todo",
    updatedAt: "2023-12-15T02:31:00.146Z",
  };

  it("opens modal on edit button click", async () => {
    render(<TodoItem item={mockTodo} />);
    const editButton = screen.getByText("edit");
    fireEvent.click(editButton);
    await waitFor(() => {
      expect(screen.getByTestId("todo-modal")).toBeInTheDocument();
    });
  });

  it("deletes todo on delete button click", async () => {
    const mockDeleteTodo = jest
      .spyOn(clientRequests, "deleteTodo")
      .mockImplementation((id: number) => new Promise(() => {}));
    render(<TodoItem item={mockTodo} />);
    const deleteButton = screen.getByText("delete");
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
    });
  });
});
