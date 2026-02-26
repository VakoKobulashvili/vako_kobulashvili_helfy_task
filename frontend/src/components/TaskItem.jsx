const TaskItem = ({ task, onEdit, onToggle, onDelete }) => {
  return (
    <div>
      <h2>{task?.title}</h2>
      <p>{task?.description}</p>
      <div>Completed: {task?.completed ? "True" : "False"}</div>
      <div>Priority: {task?.priority}</div>
      <div>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onToggle(task.id)}>Toggle Completion</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
