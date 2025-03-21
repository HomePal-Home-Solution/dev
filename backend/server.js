import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

import routes from "./routes/routes.js"; // Import the centralized routes
import ToDoRouter from './routes/toDoListRoutes.js'; // Import to-do routes

dotenv.config();

const app = express();

app.use(express.json()); // Allows us to accept JSON data in the req.body

// Use the routes file for general routes
app.use("/api", routes); // This will map to `/api/recipes`

// Use the ToDoRouter for to-do list routes
app.use("/api/toDoList", ToDoRouter); // All to-do related routes will be under `/api/toDoList`

app.listen(5000, () => {
    connectDB(); // Connect to the database
    console.log("Server started at http://localhost:5000");
});
