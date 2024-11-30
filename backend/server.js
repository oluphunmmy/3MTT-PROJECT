// Import Express
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Initialize the app
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Define the port
const PORT = process.env.PORT || 3555;


// Routes
const authRoutes = require('./routes/auth.route.js');
const taskRoutes = require('./routes/task.route.js');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Use auth routes
app.use(process.env.APP_AUTH_ROUTE, authRoutes);
// Use task routes
app.use(process.env.APP_TASK_ROUTE, taskRoutes);


// Create a simple GET route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
