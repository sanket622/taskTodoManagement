import Notification from '../models/Notification.js';
import Task from '../models/Task.js';
import Log from '../models/Log.js';

const sendNotification = async (userId, message) => {
  await new Notification({ user: userId, message }).save();
};

const logAction = async (userId, taskId, action, details = {}) => {
  try {
    await Log.create({ user: userId, task: taskId, action, details });
  } catch (error) {
    console.error('Logging error:', error);
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });

    await logAction(req.user.id, task._id, 'CREATE_TASK', { title: task.title });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getTasks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const tasks = await Task.find({ assignedTo: req.user._id })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json(tasks);
};



export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedFields = Object.keys(req.body).reduce((changes, field) => {
      if (task[field] !== req.body[field]) {
        changes[field] = { old: task[field], new: req.body[field] };
      }
      return changes;
    }, {});

    Object.assign(task, req.body);
    await task.save();

    await logAction(req.user.id, task._id, 'UPDATE_TASK', updatedFields);

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await logAction(req.user.id, task._id, 'DELETE_TASK', { title: task.title });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const assignTask = async (req, res) => {
  try {
    console.log(req.params['taskId']);
    
    const task = await Task.findById(req.params['taskId']);
    
    task.assignedTo = req.body.userId;
    await task.save();

    await sendNotification(req.body.userId, `You have been assigned a new task: ${task.title}`);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate('user', 'name email').populate('task', 'title');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
