import { useState } from "react";
import { Todo } from "../../types";
import { List, message } from "antd";
import { Button } from "antd";
import TodoModal from "../todo-modal/TodoModal";
import { deleteTodo, updateTodo } from "../../client-requests";
import { useTodos } from "../../hooks/useToDos";

interface TodoItemProps {
  item: Todo;
}

const TodoItem = ({ item }: TodoItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { editTodo, removeTodo } = useTodos();
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
        console.error(err);
        messageApi.open({
          type: "error",
          content: "Error! The todo could not be updated",
        });
      })
      .finally(() => messageApi.destroy("loader"));
  };

  const handleDelete = () => {
    messageApi.open({
      type: "loading",
      content: "Deleting todo..",
      key: "loader",
    });

    deleteTodo(item.id)
      .then((_) => {
        setIsModalOpen(false);
        messageApi.open({
          type: "success",
          content: "Todo deleted",
        });
        removeTodo(item.id);
      })
      .catch((err) => {
        console.error(err);
        messageApi.open({
          type: "error",
          content: "Error! The todo could not be deleted",
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
          <Button onClick={handleDelete} type="text" key="list-loadmore-more">
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
