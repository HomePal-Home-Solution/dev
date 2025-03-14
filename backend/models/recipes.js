import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    items_count:{
        type: Number,
        required: true
    },
    calories:{
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;