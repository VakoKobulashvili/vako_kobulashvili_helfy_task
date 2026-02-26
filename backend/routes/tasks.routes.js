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

router.get("/", (req, res) => {
  const data = tasks;
  res.json(data);
});

// router.post("/");
// router.put("/:id");
// router.delete("/:id");
// router.patch("/:id/toggle");

module.exports = router;
