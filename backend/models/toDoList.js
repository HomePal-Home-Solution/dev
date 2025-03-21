import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3  // Ensures title has at least 3 characters
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
        default: null, // Ensures dueDate is either a valid date or null
        validate: {
            validator: (value) => !value || !isNaN(new Date(value).getTime()),
            message: "Invalid date format"
        }
    }
}, {
    timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
