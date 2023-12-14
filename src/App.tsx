import React, { useState } from "react";
import TodoList from "./components/TodoList";
import { Todo } from "./types";
import { Form, Input, Button, List } from "antd";
import styles from "./App.module.css";
// import "antd/dist/antd.css";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (values: { todoText: string }) => {
    if (!values.todoText) return;
    setTodos([
      ...todos,
      { id: Date.now().toString(), text: values.todoText, completed: false },
    ]);
  };

  return (
    <div>
      <h1 className={styles.test}>Todo List</h1>
      <List
        size="large"
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            {item.text}
          </List.Item>
        )}
      />
      <Form onFinish={addTodo}>
        <Form.Item
          name="todoText"
          rules={[{ required: true, message: "Please input your todo!" }]}
        >
          <Input placeholder="Add new todo" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Todo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
