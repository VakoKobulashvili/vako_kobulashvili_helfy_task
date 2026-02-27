import { useEffect } from "react";
import { useState } from "react";
import { deleteTask, getTasks, toggleTask } from "../services/tasks.service";
import InfinityCarousel from "./InfinityCarousel";
import TaskForm from "./TaskForm";

import "../styles/TaskList.css";

const TaskList = ({ filter, searchQuery }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    // added localstorage for bonus, if storage exists fetch wont be used
    const storage = localStorage.getItem("tasks");

    if (storage) {
      setTasks(JSON.parse(storage));
      return;
    }

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

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // filtering & search logic (final state)
  const query = (debouncedSearch || "").trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const status =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    const search =
      !query ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query);

    return status && search;
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
    <div className="tasklist-container">
      {loading ? (
        <div className="loading">Loading...</div>
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
          <div className="modal-content">
            <button
              onClick={() => setEditingTask(null)}
              className="modal-close-btn"
            >
              &times;
            </button>

            <TaskForm
              editTaskData={editingTask}
              onClose={() => setEditingTask(null)}
              onSuccess={handleFormSuccess}
            />
          </div>
        </div>
      )}

      {/* delete confirm modal, opens when delete clicking */}
      {deleteId && (
        <div className="modal-window">
          <div className="modal-content">
            <h1 className="modal-title">Do you want to delete permanently?</h1>
            <div className="modal-btn-container">
              <button
                onClick={() => {
                  confirmDelete();
                }}
                className="confirm-btn"
              >
                Confirm
              </button>
              <button onClick={() => setDeleteId(null)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
