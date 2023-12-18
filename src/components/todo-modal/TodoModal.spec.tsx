import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TodoModal from "./TodoModal";
import matchMediaMock from "../../mocks/matchMedia.mock";
import "@testing-library/jest-dom";

matchMediaMock();

describe("TodoModal", () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleClose = jest.fn();
  const item = {
    createdAt: "2023-12-14T22:19:09.270Z",
    id: 1,
    name: "test1",
    updatedAt: "2023-12-15T02:31:00.146Z",
  };

  it("renders the modal with correct title for create", () => {
    render(
      <TodoModal
        isModalOpen={true}
        handleSubmit={mockHandleSubmit}
        handleClose={mockHandleClose}
      />
    );
    expect(screen.getByText("Add todo")).toBeInTheDocument();
  });

  it("renders the modal with correct title for update", () => {
    render(
      <TodoModal
        item={item}
        isModalOpen={true}
        handleSubmit={mockHandleSubmit}
        handleClose={mockHandleClose}
      />
    );
    expect(screen.getByText("Update todo")).toBeInTheDocument();
  });

  it("calls handleSubmit with correct data on form submission", async () => {
    render(
      <TodoModal
        isModalOpen={true}
        handleSubmit={mockHandleSubmit}
        handleClose={mockHandleClose}
      />
    );
    const input = screen.getByPlaceholderText("Name of todo");
    fireEvent.change(input, { target: { value: "New Todo" } });
    const submitButton = screen.getByText("Add todo");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledWith({ name: "New Todo" });
    });
  });

  it("calls handleClose on cancel button click", async () => {
    render(
      <TodoModal
        isModalOpen={true}
        handleSubmit={mockHandleSubmit}
        handleClose={mockHandleClose}
      />
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    await waitFor(() => {
      expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });
  });

  it("validates input before submission", async () => {
    render(
      <TodoModal
        isModalOpen={true}
        handleSubmit={mockHandleSubmit}
        handleClose={mockHandleClose}
      />
    );
    const submitButton = screen.getByText("Add todo");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Please input your todo!")).toBeInTheDocument();
    });
  });
});
