import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../ToDoList/ToDoLsit.css/AddTaskForm.css'; // Import the CSS for styling

const AddTaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/toDoList/create", task);
      navigate("/todolist"); // Redirect to ToDo list after creating the task
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleBack = () => {
    navigate("/todolist"); // Navigate back to ToDoList page
  };

  return (
    <div className="add-task-container">
      <h1 className="title">Create Task</h1>
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </div>
      </form>

      {/* Move the Back button below the form */}
      <div className="form-group">
        <button onClick={handleBack} className="back-btn">
          Back to To-Do List
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
