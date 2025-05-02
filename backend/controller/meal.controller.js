// import mongoose from "mongoose";
// import Meal from "../models/meals.js";

// // get all meals
// export const getMeals = async (req, res) => {
//     try {
//         const meals = await Meal.find({});
//         res.status(200).json({ success: true, data: meals });
//     } catch (error) {
//         console.error("Error in fetching meals", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

// // get a meal by id
// export const getMealById = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ success: false, message: "Invalid meal ID" });
//     }

//     try {
//         const meal = await Meal.findById(id);
//         if (!meal) {
//             return res.status(404).json({ success: false, message: "Meal not found" });
//         }
//         res.status(200).json({ success: true, data: meal });
//     } catch (error) {
//         console.error("Error in fetching meal by ID", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

// // create a meal
// export const createMeal = async (req, res) => {
//     const meal = req.body;

//     const requiredFields = ['name', 'ingredients', 'calories', 'sugar', 'fat', 'type'];
//     const missingFields = requiredFields.filter(field => !meal[field]);

//     if (missingFields.length > 0) {
//         return res.status(400).json({
//             success: false,
//             message: `Please provide all fields: missing ${missingFields.join(', ')}`
//         });
//     }

//     const newMeal = new Meal(meal);

//     try {
//         await newMeal.save();
//         res.status(201).json({ success: true, data: newMeal });
//     } catch (error) {
//         console.error("Error in creating meal", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

// // update a meal
// export const updateMeal = async (req, res) => {
//     const { id } = req.params;
//     const meal = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ success: false, message: "Invalid meal ID" });
//     }

//     try {
//         const updatedMeal = await Meal.findByIdAndUpdate(id, meal, { new: true });
//         res.status(200).json({ success: true, data: updatedMeal });
//     } catch (error) {
//         console.error("Error in updating meal", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

// // delete a meal
// export const deleteMeal = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await Meal.findByIdAndDelete(id);
//         res.status(200).json({ success: true, message: "Meal deleted" });
//     } catch (error) {
//         console.error("Error in deleting meal", error.message);
//         res.status(404).json({ success: false, message: "Meal not found" });
//     }
// };




import mongoose from "mongoose";
import Meal from "../models/meals.js";

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
