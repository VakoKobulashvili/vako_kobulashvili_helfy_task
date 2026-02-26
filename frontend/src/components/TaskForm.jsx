import { useEffect, useState } from "react";
import { createTask, editTask } from "../services/tasks.service";

const TaskForm = ({ editTaskData = null, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    priority: "",
    general: "",
  });

  // If we have editTaskData passed it means its edit form and not creating one!
  useEffect(() => {
    setTitle(editTaskData?.title ?? "");
    setDesc(editTaskData?.description ?? "");
    setPriority(editTaskData?.priority ?? "");
    setErrors({ title: "", desc: "", priority: "", general: "" });
  }, [editTaskData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      title: "",
      desc: "",
      priority: "",
      general: "",
    });

    const inputErrors = {
      title: "",
      desc: "",
      priority: "",
      general: "",
    };

    if (!title) {
      inputErrors.title = "Title is required!";
    } else if (title.trim().length >= 20) {
      inputErrors.title = "Title must be less than 20 characters.";
    }

    if (!desc) {
      inputErrors.desc = "Description is required.";
    }

    const allowedPriorities = ["low", "medium", "high"];
    if (priority !== undefined && !allowedPriorities.includes(priority)) {
      inputErrors.priority = "Priority must be Low, Medium, or High only!";
    }

    if (Object.values(inputErrors).some((value) => value !== "")) {
      setErrors(inputErrors);
      return;
    }

    try {
      let resultTask;

      if (editTaskData) {
        resultTask = await editTask(editTaskData.id, {
          title: title,
          description: desc,
          completed: editTaskData.completed,
          priority,
        });
      } else {
        resultTask = await createTask({
          title: title,
          description: desc,
          completed: false,
          priority,
        });

        setTitle("");
        setDesc("");
        setPriority("");
      }

      onSuccess?.(resultTask);
      onClose?.();
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: editTaskData
          ? "Error while updating task!"
          : "Error while creating task!",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></textarea>
        {errors.desc && <p className="error-message">{errors.desc}</p>}
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        >
          <option value="" disabled>
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && <p className="error-message">{errors.priority}</p>}
      </div>
      {errors.general && <p className="error-message">{errors.general}</p>}
      <button type="submit">
        {editTaskData ? "Edit Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
