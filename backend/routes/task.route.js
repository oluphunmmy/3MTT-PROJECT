const express = require("express");
const router = express.Router();
const {
    createTask,
    updateTask,
    deleteTask,
    // filterByDeadline,
    // filterByPriority,
    getUserTasks,
} = require("../controller/task.controller.js");

const authMiddleware = require("../middleware/authMiddleware.js");


// Route to create a new task
router.post("/create", createTask);

// Route to update a task by ID
router.put("/update/:task_id", updateTask);

// Route to delete a task by ID
router.delete("/delete/:task_id", deleteTask);

// Route to get tasks filtered by deadline
// router.get("/filter/deadline", filterByDeadline);

// Route to get tasks filtered by priority
// router.get("/filter/priority", filterByPriority);

// Route to get all tasks for a specific user
router.get("/user/:user_id", getUserTasks);

module.exports = router;
