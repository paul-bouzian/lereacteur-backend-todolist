const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/tasks", async (req, res) => {
  try {
    const { text, completed } = req.body;
    const task = new Task({ text, completed });

    await task.save();
    const allTasks = await Task.find();
    return res.status(201).json(allTasks);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/tasks/:text", async (req, res) => {
  try {
    const { text } = req.params;
    const task = await Task.findOne({ text: text });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.deleteOne();
    const allTasks = await Task.find();
    console.log(allTasks);
    return res.status(201).json(allTasks);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/tasks/:text", async (req, res) => {
  try {
    const { text } = req.params;
    const { completed } = req.body;
    const task = await Task.findOne({ text: text });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.completed = completed;
    await task.save();
    const allTasks = await Task.find();
    return res.status(201).json(allTasks);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
