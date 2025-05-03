import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker"; // Import react-datepicker
// import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import "../ToDoList/ToDoLsit_css/AddTaskForm.css"; // Import your custom CSS

const AddTaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
  const [errors, setErrors] = useState({});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // State to control date picker visibility
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!task.title.trim()) {
      errors.title = "Title is required";
    } else if (task.title.length < 3 || task.title.length > 50) {
      errors.title = "Title must be between 3 and 50 characters";
    }

    if (!task.description.trim()) {
      errors.description = "Description is required";
    } else if (task.description.length < 5) {
      errors.description = "Description must be at least 5 characters long";
    }

    if (!task.dueDate) {
      errors.dueDate = "Due date is required";
    } else if (new Date(task.dueDate) <= new Date()) {
      errors.dueDate = "Due date must be in the future";
    }

    if (!task.priority) {
      errors.priority = "Priority is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "title" || name === "description") {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setTask({ ...task, [name]: value });
  };

  const handleDateChange = (e) => {
    console.log(e);
    // setTask({ ...task, dueDate: date.toISOString() }); // Update dueDate in ISO format
    const dateValue = e.target.value;
    const isoDate = new Date(dateValue).toISOString(); // Convert to full ISO format
    setTask({ ...task, dueDate: isoDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post("/api/toDoList/create", task);
      navigate("/todolist");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleBack = () => {
    navigate("/todolist");
  };

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <div className="add-task-container">
      <h1 className="title">Create Task</h1>
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-group-task">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-input"
          />
          {errors.title && <p className="error-text" style={{ color: "red" }}>{errors.title}</p>}
        </div>
        <div className="form-group-task">
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-input"
          />
          {errors.description && <p className="error-text" style={{ color: "red" }}>{errors.description}</p>}
        </div>
        <div className="form-group-task">
          <label>Due Date:</label>
          <input 
            name="dueDate" 
            type="date" 
            className="form-input"
            onChange={handleDateChange}
            value={task.dueDate ? task.dueDate.slice(0, 10) : ""}/>
          {/* <div className="date-picker-container">
            <input
              type="text"
              value={task.dueDate ? new Date(task.dueDate).toLocaleString() : ""}
              onClick={handleOpenDatePicker}
              className="form-input"
              readOnly
              placeholder="Select due date"
            />
            {isDatePickerOpen && (
              <div className="date-picker-wrapper">
                <DatePicker
                  selected={task.dueDate ? new Date(task.dueDate) : null}
                  onChange={handleDateChange}
                  showTimeSelect
                  dateFormat="Pp"
                  inline
                  minDate={new Date()} // Prevent selecting past dates
                />
                <button
                  type="button"
                  className="date-picker-ok-btn"
                  onClick={handleCloseDatePicker}
                >
                  OK
                </button>
              </div>
            )}
          </div> */}
          {errors.dueDate && <p className="error-text" style={{ color: "red" }}>{errors.dueDate}</p>}
        </div>
        <div className="form-group-task">
          <label>Priority:</label>
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
        <div className="form-group-task">
          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </div>
      </form>
      <div className="form-group-task">
        <button onClick={handleBack} className="back-btn">
          Back to To-Do List
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;






















// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import '../ToDoList/ToDoLsit.css/AddTaskForm.css'; // Import the CSS for styling

// const AddTaskForm = () => {
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//     priority: "Medium",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setTask({
//       ...task,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/toDoList/create", task);
//       navigate("/todolist"); // Redirect to ToDo list after creating the task
//     } catch (error) {
//       console.error("Error creating task:", error);
//     }
//   };

//   const handleBack = () => {
//     navigate("/todolist"); // Navigate back to ToDoList page
//   };

//   return (
//     <div className="add-task-container">
//       <h1 className="title">Create Task</h1>
//       <form onSubmit={handleSubmit} className="add-task-form">
//         <div className="form-group">
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={task.title}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={task.description}
//             onChange={handleChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label>Due Date:</label>
//           <input
//             type="datetime-local"
//             name="dueDate"
//             value={task.dueDate}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label>Priority:</label>
//           <select
//             name="priority"
//             value={task.priority}
//             onChange={handleChange}
//             required
//             className="form-select"
//           >
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <button type="submit" className="submit-btn">
//             Create Task
//           </button>
//         </div>
//       </form>

//       {/* Move the Back button below the form */}
//       <div className="form-group">
//         <button onClick={handleBack} className="back-btn">
//           Back to To-Do List
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddTaskForm;
