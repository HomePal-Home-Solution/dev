import express from "express";
import mongoose from "mongoose";
import Recipe from "../models/recipes.js";


// import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from "../controller/recipe.controller.js"

const router = express.Router();

// router.get("/", getRecipes);
// router.post("/", createRecipe);
// router.put("/:id", updateRecipe);
// router.delete("/:id", deleteRecipe);


router.get("/", async (req, res) => {
    try{
        const recipes = await Recipe.find({});
        res.status(200).json({ success: true, data: recipes })
    }catch(error){
        console.error("Error in searching Product", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});


router.post("/", async (req, res) => {
    const recipe = req.body; // user send product data

    if(!recipe.name || !recipe.items_count || !recipe.calories){
    return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newRecipe = new Recipe(recipe);

    try {
        await newRecipe.save();
        res.status(201).json({ success: true, data: newRecipe});
    } catch (error) {
        console.error("Error in creating Product", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;

    const recipe = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid recipe id"})
    }

    try {
        const updateRecipe = await Recipe.findByIdAndUpdate(id, recipe, {new: true});
        res.status(200).json({ success: true, data: updateRecipe})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"})
    }
});



router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try{
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Recipe Deleted"})
    }catch (error){
        console.error("Error in deleting Product", error.message);
        res.status(404).json({ success: false, message: "Recipe not found"});
    }
});

export default router;