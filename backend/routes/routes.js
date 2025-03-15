import express from "express";
import recipeRoutes from "./recipe.router.js"; // Import recipe routes

const router = express.Router();

// Connect different route modules
router.use("/recipes", recipeRoutes); // All recipe-related routes will be under `/api/recipes`

export default router;
