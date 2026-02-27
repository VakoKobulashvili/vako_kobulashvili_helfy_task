import "../styles/TaskItem.css";

const TaskItem = ({ task, onEdit, onToggle, onDelete }) => {
  return (
    <div className="card-container">
      <div className="card-title-container">
        <h2 className="card-title">{task?.title}</h2>
        <p>{task?.createdAt}</p>
      </div>
      <p className="card-desc">{task?.description}</p>
      <div className="card-completed">
        Completed: {task?.completed ? "True" : "False"}
      </div>
      <div
        className="card-priority"
        style={{
          color:
            task?.priority === "high"
              ? "red"
              : task?.priority === "medium"
                ? "orange"
                : "green",
        }}
      >
        Priority: {task?.priority}
      </div>
      <div className="card-btns-container">
        <button onClick={() => onEdit(task)} className="card-primary-btn">
          Edit
        </button>
        <button onClick={() => onToggle(task.id)} className="card-primary-btn">
          Toggle Completion
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="card-secondary-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
