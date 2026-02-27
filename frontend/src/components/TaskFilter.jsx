import "../styles/TaskFilter.css";

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="filter-container">
      <h2 className="filter-title">Filter Tasks</h2>

      <div className="filter-btns-container">
        <button
          onClick={() => setFilter("all")}
          className={
            filter === "all" ? "filter-btn filter-btn-active" : "filter-btn"
          }
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={
            filter === "completed"
              ? "filter-btn filter-btn-active"
              : "filter-btn"
          }
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={
            filter === "pending" ? "filter-btn filter-btn-active" : "filter-btn"
          }
        >
          Pending
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;
