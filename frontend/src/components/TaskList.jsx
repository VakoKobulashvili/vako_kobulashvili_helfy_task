import { useEffect } from "react";
import { useState } from "react";
import { deleteTask, getTasks, toggleTask } from "../services/tasks.service";
import InfinityCarousel from "./InfinityCarousel";
import TaskForm from "./TaskForm";

const TaskList = ({ filter }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const result = await getTasks();
        setTasks(result);
      } catch (err) {
        console.log("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // filtering logic (final state)
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return false;
  });

  // updates created or edited data in state on success
  const handleFormSuccess = (updatedTask) => {
    setTasks((prev) => {
      const filtered = prev.filter(
        (t) => String(t.id) !== String(updatedTask.id),
      );
      return [updatedTask, ...filtered];
    });

    setEditingTask(null);
  };

  const handleToggleCompletion = async (taskId) => {
    try {
      const updatedTask = await toggleTask(taskId);

      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      );
    } catch (err) {
      console.log("Toggle failed", err);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(deleteId);

      setTasks((prev) => prev.filter((t) => String(t.id) !== String(deleteId)));
    } catch (err) {
      console.log("Error deleting task", err);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : filteredTasks.length === 0 ? (
        <div>No tasks found!</div>
      ) : (
        <InfinityCarousel
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onToggle={handleToggleCompletion}
          onDelete={(id) => setDeleteId(id)}
        />
      )}

      <TaskForm onSuccess={handleFormSuccess} />

      {/* edit form modal, opens when clicking edit button */}
      {editingTask && (
        <div className="modal-window">
          <button onClick={() => setEditingTask(null)}>Close Modal</button>

          <TaskForm
            editTaskData={editingTask}
            onClose={() => setEditingTask(null)}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}

      {/* delete confirm modal, opens when delete clicking */}
      {deleteId && (
        <div className="modal-window">
          <h1>Confirm if you want to delete</h1>
          <div>
            <button
              onClick={() => {
                confirmDelete();
              }}
            >
              Confirm
            </button>
            <button onClick={() => setDeleteId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
