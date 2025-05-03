import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import "../ToDoList/ToDoLsit_css/todolist.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/toDoList/view");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Mark task as completed or not completed
  const toggleComplete = async (taskId, currentStatus) => {
    try {
      const updatedTask = { completed: !currentStatus };
      await axios.put(`/api/toDoList/update/${taskId}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/toDoList/delete/${taskId}`);
      fetchTasks();
      setShowConfirmModal(false);
      setTaskIdToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Show confirmation modal
  const handleDeleteClick = (taskId) => {
    setTaskIdToDelete(taskId);
    setShowConfirmModal(true);
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setTaskIdToDelete(null);
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle navigation to AddTaskForm page
  const handleCreateTask = () => {
    navigate("/daily-tasks-form");
  };

  // Handle navigation to UpdateToDo page
  const handleUpdateTask = (taskId) => {
    navigate(`/update-todolist/${taskId}`);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Download as PDF
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("To-Do List Report", 14, 20);

    const tableColumn = ["Title", "Description", "Due Date", "Priority", "Completed"];
    const tableRows = [];

    tasks.forEach((task) => {
      const taskData = [
        task.title,
        task.description,
        new Date(task.dueDate).toLocaleString(),
        task.priority,
        task.completed ? "Yes" : "No",
      ];
      tableRows.push(taskData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("ToDoList_Report.pdf");
  };

  // Filter tasks based on search term
  const filteredTasks = tasks
    .filter((task) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        !task.completed &&
        (task.title.toLowerCase().includes(lowerSearch) ||
          task.description.toLowerCase().includes(lowerSearch))
      );
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="todo-container">
      <h1 className="title">To-Do List</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Task Title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-btn">Search</button>
        <button className="download-btn" onClick={handleDownload}>Download</button>
      </div>

      <button className="add-btn" onClick={handleCreateTask}>Create Task</button>

      <table className="todo-table">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.dueDate).toLocaleString()}</td>
                <td>
                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </td>
                <td>
                  <button className="edit-icon" onClick={() => handleUpdateTask(task._id)}>
                    Update
                  </button>
                  <button className="delete-icon" onClick={() => handleDeleteClick(task._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => toggleComplete(task._id, task.completed)}
                    className="complete-btn"
                    style={{
                      backgroundColor: task.completed ? "#0b5ed7" : "#198754",
                    }}
                  >
                    {task.completed ? "Completed" : "Mark as Complete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Completed Tasks</h2>
      <table className="todo-table completed-table">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Completed At</th>
            <th>Undo</th>
          </tr>
        </thead>
        <tbody>
          {tasks.filter((task) => task.completed).length > 0 ? (
            tasks
              .filter((task) => task.completed)
              .sort((a, b) => new Date(b.updatedAt || b.dueDate) - new Date(a.updatedAt || a.dueDate))
              .map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.dueDate).toLocaleString()}</td>
                  <td>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>{new Date(task.updatedAt || Date.now()).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => toggleComplete(task._id, task.completed)}
                      className="complete-btn"
                      style={{ backgroundColor: "#ffc107" }}
                    >
                      Not Completed
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6">No completed tasks</td>
            </tr>
          )}
        </tbody>
      </table>

      {showConfirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this task?</p>
            <div className="confirm-modal-buttons">
              <button className="cancel-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="delete-btn" onClick={() => deleteTask(taskIdToDelete)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
