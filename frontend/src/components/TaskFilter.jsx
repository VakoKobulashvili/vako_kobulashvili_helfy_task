const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <h2>Filter Tasks</h2>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
    </div>
  );
};

export default TaskFilter;
