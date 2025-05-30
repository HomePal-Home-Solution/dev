import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../ToDoList/ToDoLsit.css/updateTodo.css"; // Import the CSS for styling

const UpdateToDo = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch the task based on taskId
  const fetchTask = async () => {
    try {
      const response = await axios.get(`/api/toDoList/view/${taskId}`);
      setTask(response.data);
    } catch (err) {
      setErrors({ global: "Error fetching task: " + err.message });
      console.error("Error fetching task:", err);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchTask();
    } else {
      setErrors({ global: "Task ID is missing in the URL." });
    }
  }, [taskId]);

  const validateForm = () => {
    let errors = {};

    // Title validation
    if (!task.title.trim()) {
      errors.title = "Title is required";
    } else if (task.title.length < 3 || task.title.length > 50) {
      errors.title = "Title must be between 3 and 50 characters";
    }

    // Description validation
    if (!task.description.trim()) {
      errors.description = "Description is required";
    } else if (task.description.length < 5) {
      errors.description = "Description must be at least 5 characters long";
    }

    // Due Date validation
    if (!task.dueDate) {
      errors.dueDate = "Due date is required";
    } else if (new Date(task.dueDate) <= new Date()) {
      errors.dueDate = "Due date must be in the future";
    }

    // Priority validation
    if (!task.priority) {
      errors.priority = "Priority is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.put(`/api/toDoList/update/${taskId}`, task);
      navigate("/todolist");
    } catch (err) {
      setErrors({ global: "Error updating task: " + err.message });
      console.error("Error updating task:", err);
    }
  };

  const handleBack = () => {
    navigate("/todolist"); // Navigate back to ToDoList page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <div className="update-todo-container">
      <h1 className="title">Update Task</h1>
      {errors.global && <div className="error-message" style={{ color: "red" }}>{errors.global}</div>}
      {task ? (
        <form onSubmit={handleUpdate} className="update-todo-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="form-input"
            />
            {errors.title && <p className="error-text" style={{ color: "red" }}>{errors.title}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="form-input"
            />
            {errors.description && <p className="error-text" style={{ color: "red" }}>{errors.description}</p>}
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="datetime-local"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="form-input"
            />
            {errors.dueDate && <p className="error-text" style={{ color: "red" }}>{errors.dueDate}</p>}
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && <p className="error-text" style={{ color: "red" }}>{errors.priority}</p>}
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">
              Update Task
            </button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      
      {/* Back Button */}
      <div className="form-group">
        <button onClick={handleBack} className="back-btn">
          Back to To-Do List
        </button>
      </div>
    </div>
  );
};

export default UpdateToDo;











// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import '../ToDoList/ToDoLsit.css/updateTodo.css'; // Import the CSS for styling

// const UpdateToDo = () => {
//   const { taskId } = useParams();
//   const [task, setTask] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Fetch the task based on taskId
//   const fetchTask = async () => {
//     try {
//       const response = await axios.get(`/api/toDoList/view/${taskId}`);
//       setTask(response.data);
//     } catch (err) {
//       setError("Error fetching task: " + err.message);
//       console.error("Error fetching task:", err);
//     }
//   };

//   useEffect(() => {
//     if (taskId) {
//       fetchTask();
//     } else {
//       setError("Task ID is missing in the URL.");
//     }
//   }, [taskId]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/api/toDoList/update/${taskId}`, task);
//       navigate("/todolist");
//     } catch (err) {
//       setError("Error updating task: " + err.message);
//       console.error("Error updating task:", err);
//     }
//   };

//   // Back button click handler
//   const handleBack = () => {
//     navigate("/todolist"); // Navigate back to ToDoList page
//   };

//   return (
//     <div className="update-todo-container">
//       <h1 className="title">Update Task</h1>
//       {error && <div className="error-message">{error}</div>}
//       {task ? (
//         <form onSubmit={handleUpdate} className="update-todo-form">
//           <div className="form-group">
//             <label>Title</label>
//             <input
//               type="text"
//               value={task.title}
//               onChange={(e) => setTask({ ...task, title: e.target.value })}
//               className="form-input"
//             />
//           </div>
//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               value={task.description}
//               onChange={(e) =>
//                 setTask({ ...task, description: e.target.value })
//               }
//               className="form-input"
//             />
//           </div>
//           <div className="form-group">
//             <label>Due Date</label>
//             <input
//               type="datetime-local"
//               value={task.dueDate}
//               onChange={(e) =>
//                 setTask({ ...task, dueDate: e.target.value })
//               }
//               className="form-input"
//             />
//           </div>
//           <div className="form-group">
//             <label>Priority</label>
//             <select
//               value={task.priority}
//               onChange={(e) =>
//                 setTask({ ...task, priority: e.target.value })
//               }
//               className="form-select"
//             >
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <button type="submit" className="submit-btn">
//               Update Task
//             </button>
//           </div>
//         </form>
//       ) : (
//         <p>Loading...</p>
//       )}
      
//       {/* Back Button */}
//       <div className="form-group">
//         <button onClick={handleBack} className="back-btn">
//           Back to To-Do List
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpdateToDo;
