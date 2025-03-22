import asyncHandler from "express-async-handler";
import Todo from "../models/toDolist.js";

// Create a new todo
export const createTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);         
});

// View all todos
export const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find(); 
    res.status(200).json(todos); 
});

// View a todo by ID
export const getTodoById = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }
    res.status(200).json(todo);
});

// Update a todo by ID
export const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }

    res.status(200).json(todo);
});

// Delete a todo by ID
export const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }

    res.status(200).json({ message: "Todo deleted successfully" });
});
