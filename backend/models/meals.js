import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    sugar: {
        type: String,
        enum: ['low', 'normal'],
        required: true
    },
    fat: {
        type: String,
        enum: ['low', 'normal'],
        required: true
    },
    type: {
        type: String,
        enum: ['breakfast', 'lunch', 'snack', 'dinner'],
        required: true
    }
}, {
    timestamps: true
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;
