const mongoose = require('mongoose');
const Task = mongoose.model('Task');

// GET /tasks
exports.list_all_tasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// POST /tasks
exports.create_a_task = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// GET /tasks/:taskId
exports.read_a_task = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// PUT /tasks/:taskId
exports.update_a_task = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// DELETE /tasks/:taskId
exports.delete_a_task = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', _id: task.id });
  } catch (err) {
    next(err);
  }
};
