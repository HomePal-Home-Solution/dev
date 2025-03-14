import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

import recipeRoutes from "./routes/recipe.router.js";

dotenv.config();

const app = express();

app.use(express.json());// allows us to accept JSON data in the req.body

app.use("/api/recipes", recipeRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
})