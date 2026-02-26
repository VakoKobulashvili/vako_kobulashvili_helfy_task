const express = require("express");

const router = express.Router();

let tasks = [
  {
    id: 1,
    title: "task1",
    description: "task1 description",
    completed: false,
    createdAt: "26-02-2026",
    priority: "low",
  },
];

router.get("/", (req, res) => {
  try {
    const data = tasks;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error while fetching tasks", err });
  }
});

router.post("/", (req, res) => {
  try {
    const body = req.body;

    // better id generation to avoid duplicates
    const newTask = {
      id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      title: body.title,
      description: body.description,
      completed: body.completed,
      createdAt: new Date(),
      priority: body.priority,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Post request unsuccessful", err });
  }
});

router.put("/:id", (req, res) => {
  try {
    const body = req.body;
    const id = Number(req.params.id);

    const task = tasks.find((item) => item.id === id);

    if (!task) {
      return res.status(404).json({ message: "Task was not found!" });
    }

    task.title = body.title;
    task.description = body.description;
    task.completed = body.completed;
    task.priority = body.priority;

    res.status(200).json({ message: "Task updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error updating task", err });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    // Checks if even at least one id comparison is true
    const taskExists = tasks.some((item) => item.id === id);

    if (!taskExists) {
      return res.status(404).json({ message: "Task not found" });
    }

    tasks = tasks.filter((item) => item.id !== id);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message: "Error deleting task",
      err,
    });
  }
});

router.patch("/:id/toggle", (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = tasks.find((item) => item.id === id);

    if (!task) {
      return res.status(404).json({ message: "Task was not found!" });
    }

    task.completed = !task.completed;

    res.status(200).json({
      message: "Task toggled successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error toggling task!",
      err,
    });
  }
});

module.exports = router;
