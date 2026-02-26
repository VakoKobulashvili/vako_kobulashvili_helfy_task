import { useState } from "react";
import "./App.css";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

function App() {
  const [filter, setFilter] = useState("all");
  return (
    <>
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList filter={filter} />
    </>
  );
}

export default App;
