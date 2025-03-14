import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import Recipe from './models/recipes.js';  // Adjust the path if needed
import mongoose from 'mongoose';



dotenv.config();

const app = express();

app.use(express.json());// allows us to accept JSON data in the req.body


app.get("/api/recipes", async (req, res) => {
    try{
        const recipes = await Recipe.find({});
        res.status(200).json({ success: true, data: recipes })
    }catch(error){
        console.error("Error in searching Product", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});

app.post("/api/recipes", async (req, res) => {
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


app.put("/api/recipes/:id", async (req, res) => {
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
})


app.delete("/api/recipes/:id", async (req, res) => {
    const { id } = req.params;

    try{
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Recipe Deleted"})
    }catch (error){
        console.error("Error in deleting Product", error.message);
        res.status(404).json({ success: false, message: "Recipe not found"});
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
})