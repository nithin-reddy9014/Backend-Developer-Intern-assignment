import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    userId: req.user.id,
  });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
