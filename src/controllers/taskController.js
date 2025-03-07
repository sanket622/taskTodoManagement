import Notification from '../models/Notification.js';
import Task from '../models/Task.js';

const sendNotification = async (userId, message) => {
  await new Notification({ user: userId, message }).save();
};

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    console.log('User making request:', req.user);
    const userId = req.user._id.toString(); 
    console.log('User ID:', userId);
    const tasks =
      req.user.role === 'admin'
        ? await Task.find()
        : await Task.find({ assignedTo:userId  });

    console.log('Tasks fetched:', tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params['id']);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    console.log(req.user.role);
    
    // Check if the user is an admin or the owner of the task
    if (req.user.role !== 'Admin' && 'User' && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    // Allow only status updates for non-admin users
    
    if (req.user.role !== 'admin' && req.body.status) {
      task.status = req.body.status;
    } else {
      Object.assign(task, req.body);
    }
    
    await task.save();
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