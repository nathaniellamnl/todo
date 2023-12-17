import "antd/dist/reset.css";
import { TodoProvider } from "./providers/TodoProvider";
import TodoContainer from "./components/todo-container/TodoContainer";

const App = () => {
  return (
    <TodoProvider>
      <TodoContainer />
    </TodoProvider>
  );
};

export default App;
