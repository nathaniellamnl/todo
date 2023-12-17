import React from "react";
import { Todo } from "../../types";
import { List } from "antd";
import { Button } from "antd";

interface TodoItemProps {
  item: Todo;
}

const TodoItem = ({ item }: TodoItemProps) => {
  return (
    <List.Item
      actions={[
        <Button type="text" key="list-loadmore-edit">edit</Button>,
        <Button type="text" key="list-loadmore-more">delete</Button>,
      ]}
    >
      {item.name}
    </List.Item>
  );
};

export default TodoItem;
