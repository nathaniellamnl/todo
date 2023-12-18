import { List } from "antd";
import TodoItem from "../todo-item/TodoItem";
import { useTodos } from "../../hooks/useToDos";
import { Spin } from "antd";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const { todos, isLoading } = useTodos();
  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spin data-testid='spin'/>
      ) : (
        <List
          size="large"
          bordered
          dataSource={todos}
          renderItem={(item) => <TodoItem key={item.id} item={item} />}
        />
      )}
    </div>
  );
};

export default TodoList;
