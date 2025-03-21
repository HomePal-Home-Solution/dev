import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import cors from 'cors';
import routes from "./routes/routes.js"; // Import the centralized routes

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // Allows us to accept JSON data in the req.body

// Use the routes file
app.use("/api", routes); // This will map to `/api/recipes`

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});
