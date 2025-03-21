import express from "express";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controller/toDoListController.js";

const ToDoRouter = express.Router(); // Correctly using ToDoRouter

ToDoRouter.get("/", getTodos);
ToDoRouter.post("/", createTodo);
ToDoRouter.put("/:id", updateTodo);
ToDoRouter.delete("/:id", deleteTodo);

export default ToDoRouter;
