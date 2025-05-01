import express from "express";
import recipeRoutes from "./recipe.router.js"; // Import recipe routes
import itemRouter from "./items.router.js";   // Import items router
import mealRouter from "./meal.router.js"; // Import meal router

const router = express.Router();

// Connect different route modules
router.use("/recipes", recipeRoutes); // All recipe-related routes will be under `/api/recipes`
router.use("/items", itemRouter);
router.use("/meals", mealRouter); // All meal-related routes will be under `/api/meals`

export default router;
