import express from "express";

import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from "../controller/recipe.controller.js"

const router = express.Router();

router.get("/", getRecipes);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;