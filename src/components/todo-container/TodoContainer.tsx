import { Button, message } from "antd";
import { useState } from "react";
import { useTodos } from "../../hooks/useToDos";
import { createTodo } from "../../client-requests";
import TodoList from "../todo-list/TodoList";
import TodoModal from "../todo-modal/TodoModal";

const TodoContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { addTodo } = useTodos();

  const handleSubmit = ({ name }: { name: string }) => {
    messageApi.open({
      type: "loading",
      content: "Action in progress..",
      key: "loader",
    });
    createTodo(name)
      .then((data) => {
        setIsModalOpen(false);
        messageApi.open({
          type: "success",
          content: "Todo created",
        });
        if (data) {
          addTodo(data);
        }
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Cannot create a new todo",
        });
      })
      .finally(() => messageApi.destroy("loader"));
  };
  return (
    <div>
      {contextHolder}
      <h1>Todo List</h1>
      <Button onClick={() => setIsModalOpen(true)} type="primary">
        Add Todo
      </Button>
      <TodoList />
      <TodoModal
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        handleClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TodoContainer;
