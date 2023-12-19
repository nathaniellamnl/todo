import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import matchMediaMock from "../../mocks/matchMedia.mock";
import "@testing-library/jest-dom";
import TodoContainer from "./TodoContainer";
matchMediaMock();

jest.mock("../../hooks/useToDos", () => ({
  useTodos: jest.fn(() => ({
    editTodo: jest.fn(),
    removeTodo: jest.fn(),
  })),
}));

describe("TodoContainer", () => {
  it("opens modal on add Todo button click", async () => {
    render(<TodoContainer />);
    const editButton = screen.getByText("Add Todo");
    fireEvent.click(editButton);
    await waitFor(() => {
      expect(screen.getByTestId("todo-modal")).toBeInTheDocument();
    });
  });
});
