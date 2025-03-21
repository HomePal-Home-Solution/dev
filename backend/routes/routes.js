import express from "express";
import recipeRoutes from "./recipe.router.js"; // Import recipe routes
import ToDoRouter from "./toDoListRoutes.js"; // Import to-do list routes

const router = express.Router();

// Connect different route modules
router.use("/recipes", recipeRoutes); // All recipe-related routes will be under `/api/recipes`
router.use("/todos", ToDoRouter); // All to-do list-related routes will be under `/api/todos`

export default router;
