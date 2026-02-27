import { useState } from "react";
import "./App.css";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

function App() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TaskList filter={filter} searchQuery={searchQuery} />
    </>
  );
}

export default App;
