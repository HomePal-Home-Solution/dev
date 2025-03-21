import mongoose from "mongoose";
import Todo from "../models/toDoList.js"; 



// Get all to-do items
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        console.error("Error fetching todos:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch to-do items" });
    }
};

// Create a new to-do item
export const createTodo = async (req, res) => {
    const { title, description, completed, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: "Title is required" });
    }

    if (dueDate && isNaN(new Date(dueDate).getTime())) {
        return res.status(400).json({ success: false, message: "Invalid due date format" });
    }

    try {
        const newTodo = new Todo({ title, description, completed, dueDate });
        await newTodo.save();
        res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
        console.error("Error creating to-do item:", error.message);
        res.status(500).json({ success: false, message: "Failed to create to-do item" });
    }
};

// Update a to-do item
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const todoData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid to-do ID" });
    }

    if (todoData.dueDate && isNaN(new Date(todoData.dueDate).getTime())) {
        return res.status(400).json({ success: false, message: "Invalid due date format" });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, todoData, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ success: false, message: "To-do item not found" });
        }

        res.status(200).json({ success: true, data: updatedTodo });
    } catch (error) {
        console.error("Error updating to-do item:", error.message);
        res.status(500).json({ success: false, message: "Failed to update to-do item" });
    }
};

// Delete a to-do item
export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid to-do ID" });
    }

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: "To-do item not found" });
        }

        res.status(200).json({ success: true, message: "To-do item deleted successfully" });
    } catch (error) {
        console.error("Error deleting to-do item:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete to-do item" });
    }
};
