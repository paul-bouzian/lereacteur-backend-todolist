const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/tasks', async (req, res) => {

  try {
    const { text, completed } = req.body;
    const task = new Task({ text, completed });

    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  
    try {
      const { id } = req.params;
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await task.deleteOne();
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
});

router.get('/tasks', async (req, res) => {

  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module .exports = router;