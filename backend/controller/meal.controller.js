import mongoose from "mongoose";
import Meal from "../models/meals.js";


// controller/meal.controller.js
// export const generateMealPlan = async (req, res) => {
//     const { type, calories, sugar, fat } = req.body;
  
//     try {
//       const allMeals = await Meal.find({ type: { $in: type } });
  
//       // Try to build a simple plan greedily
//       let plan = [];
//       let totalCal = 0, totalSugar = 0, totalFat = 0;
  
//       for (let meal of allMeals) {
//         if (
//           totalCal + meal.calories <= calories &&
//           (sugar ? totalSugar + (meal.sugar === 'low' ? 1 : 2) <= (sugar === 'low' ? 2 : 4) : true) &&
//           (fat ? totalFat + (meal.fat === 'low' ? 1 : 2) <= (fat === 'low' ? 2 : 4) : true)
//         ) {
//           plan.push(meal);
//           totalCal += meal.calories;
//           totalSugar += meal.sugar === 'low' ? 1 : 2;
//           totalFat += meal.fat === 'low' ? 1 : 2;
//         }
//       }
  
//       return res.status(200).json({ success: true, data: plan });
//     } catch (err) {
//       console.error("Error generating meal plan:", err.message);
//       return res.status(500).json({ success: false, message: "Server error" });
//     }
//   };
  

// generate a meal plan based on user preferences
export const generateMealPlan = async (req, res) => {
    const { type, calories, sugar, fat } = req.body;
  
    try {
      const maxCalories = parseInt(calories) || Infinity;
  
      const allMeals = await Meal.find({
        ...(type.length ? { type: { $in: type } } : {}),
        ...(sugar ? { sugar } : {}),
        ...(fat ? { fat } : {})
      });
  
      let plan = [];
      let totalCal = 0;
  
      for (let meal of allMeals) {
        if (totalCal + meal.calories <= maxCalories) {
          plan.push(meal);
          totalCal += meal.calories;
        }
      }
  
      return res.status(200).json({ success: true, data: plan });
    } catch (err) {
      console.error("Error generating meal plan:", err.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

// get all meals with optional filters
export const getMeals = async (req, res) => {
    try {
        const { type, calories, sugar, fat } = req.query;

        const filters = {};
        if (type) filters.type = type;
        if (sugar) filters.sugar = sugar;
        if (fat) filters.fat = fat;
        if (calories) filters.calories = { $lte: Number(calories) }; // filter meals with calories <= input

        const meals = await Meal.find(filters);
        res.status(200).json({ success: true, data: meals });
    } catch (error) {
        console.error("Error in fetching meals", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// get a meal by id
export const getMealById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid meal ID" });
    }

    try {
        const meal = await Meal.findById(id);
        if (!meal) {
            return res.status(404).json({ success: false, message: "Meal not found" });
        }
        res.status(200).json({ success: true, data: meal });
    } catch (error) {
        console.error("Error in fetching meal by ID", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// create a meal
export const createMeal = async (req, res) => {
    const meal = req.body;

    const requiredFields = ['name', 'ingredients', 'calories', 'sugar', 'fat', 'type'];
    const missingFields = requiredFields.filter(field => !meal[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Please provide all fields: missing ${missingFields.join(', ')}`
        });
    }

    const newMeal = new Meal(meal);

    try {
        await newMeal.save();
        res.status(201).json({ success: true, data: newMeal });
    } catch (error) {
        console.error("Error in creating meal", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// update a meal
export const updateMeal = async (req, res) => {
    const { id } = req.params;
    const meal = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid meal ID" });
    }

    try {
        const updatedMeal = await Meal.findByIdAndUpdate(id, meal, { new: true });
        res.status(200).json({ success: true, data: updatedMeal });
    } catch (error) {
        console.error("Error in updating meal", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// delete a meal
export const deleteMeal = async (req, res) => {
    const { id } = req.params;

    try {
        await Meal.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Meal deleted" });
    } catch (error) {
        console.error("Error in deleting meal", error.message);
        res.status(404).json({ success: false, message: "Meal not found" });
    }
};
