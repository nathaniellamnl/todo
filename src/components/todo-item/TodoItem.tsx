import React, { useState } from "react";
import { Todo } from "../../types";
import { List, message } from "antd";
import { Button } from "antd";
import TodoModal from "../todo-modal/TodoModal";
import { updateTodo } from "../../client-requests";
import { useTodos } from "../../hooks/useToDos";

interface TodoItemProps {
  item: Todo;
}

const TodoItem = ({ item }: TodoItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { editTodo } = useTodos();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = ({ name }: { name: string }) => {
    messageApi.open({
      type: "loading",
      content: "Updating todo..",
      key: "loader",
    });

    updateTodo({ ...item, name })
      .then((data) => {
        setIsModalOpen(false);
        messageApi.open({
          type: "success",
          content: "Todo updated",
        });
        if (data) {
          editTodo(data);
        }
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Cannot update the todo",
        });
      })
      .finally(() => messageApi.destroy("loader"));
  };
  return (
    <>
      {contextHolder}
      <List.Item
        actions={[
          <Button
            type="text"
            key="list-loadmore-edit"
            onClick={() => setIsModalOpen(true)}
          >
            edit
          </Button>,
          <Button type="text" key="list-loadmore-more">
            delete
          </Button>,
        ]}
      >
        {item.name}
      </List.Item>
      <TodoModal
        item={item}
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TodoItem;
