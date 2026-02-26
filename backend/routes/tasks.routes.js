const express = require("express");

const router = express.Router();

const tasks = [
  {
    id: 1,
    title: "task1",
    description: "task1 description",
    completed: false,
    createdAt: "26-02-2026",
    priority: "low",
  },
];

router.get("/", async (req, res) => {
  try {
    const data = tasks;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("Error while fetching users", err);
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const newTask = {
      id: tasks.length + 1,
      title: body.title,
      description: body.description,
      completed: body.completed,
      createdAt: new Date(),
      priority: body.priority,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json("Post request unsuccessful", err);
  }
});
// router.put("/:id");
// router.delete("/:id");
// router.patch("/:id/toggle");

module.exports = router;
