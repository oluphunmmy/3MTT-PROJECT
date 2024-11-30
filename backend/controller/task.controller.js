const Task = require("../models/TaskModel.js");


// Create a new task ✅
const createTask = async (req, res) => {
    try {
        const { title, description, priority, deadline, user_id } = req.body;
        const newTask = await Task.create({ title, description, priority, deadline, user_id });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a task by ID
const updateTask = async (req, res) => {
    try {
        const { task_id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(task_id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
    try {
        const { task_id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(task_id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fitering wil be done in the frontend
// Get tasks filtered by deadline
// const filterByDeadline = async (req, res) => {
//     try {
//         const { date } = req.query;
//         const tasks = await Task.find({ deadline: { $lte: new Date(date) } });
//         res.json(tasks);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Get tasks filtered by priority
// const filterByPriority = async (req, res) => {
//     try {
//         const { priority } = req.query;
//         const tasks = await Task.find({ priority });
//         res.json(tasks);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Get all tasks for a specific user
const getUserTasks = async (req, res) => {
    try {
        const { user_id } = req.params;
        const tasks = await Task.find({ user_id });
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    // filterByDeadline,
    // filterByPriority,
    getUserTasks,
};
