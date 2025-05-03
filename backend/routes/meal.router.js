import express from "express";
import {getMeals, getMealById, createMeal, updateMeal, deleteMeal, generateMealPlan} from "../controller/meal.controller.js";

const router = express.Router();

router.get("/", getMeals);
router.get("/:id", getMealById);
router.post("/", createMeal);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);
router.post("/generate-plan", generateMealPlan);


export default router;
