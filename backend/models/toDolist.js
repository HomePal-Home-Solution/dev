import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: true,    
    },
    priority: {
        type: String,
        required: true,
    },
}, {timestamps: true,});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;