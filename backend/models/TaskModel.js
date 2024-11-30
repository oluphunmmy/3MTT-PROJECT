const { timestamps } = require('mongodb')
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    priority: { type: String, enum: ["high", "medium", "low"], required: false },
    deadline: { type: Date, required: true },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel;
