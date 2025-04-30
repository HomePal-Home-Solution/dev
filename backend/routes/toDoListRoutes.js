import express from "express";
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from "../controller/toDoListController.js";

const ToDoRouter = express.Router();

ToDoRouter.get("/view", getTodos); // Get all todos
ToDoRouter.get("/view/:id", getTodoById); // Get a todo by ID
ToDoRouter.post("/create", createTodo); // Create a new todo
ToDoRouter.put("/update/:id", updateTodo); // Update a todo by ID
ToDoRouter.delete("/delete/:id", deleteTodo); // Delete a todo by ID

export default ToDoRouter;
