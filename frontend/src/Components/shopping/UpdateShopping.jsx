import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Layouts/css/UpdateShopping.css"; // Assuming you create this CSS file

function UpdateShopping() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    unit: "",
    category: "",
    priority: "low",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`/api/shopping/view/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching item", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/shopping/update/${id}`, formData);
      navigate("/create-shopping");
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="update-shopping-container">
      <h2 className="heading">Update Shopping Item</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          className="input-field"
          disabled />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input-field"
          required />
        <input
          type="text"
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          className="input-field"
          disabled />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          className="input-field"
          disabled />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="select-field"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea-field" />
        <div className="button-container">
          <button type="submit" className="submit-button">Update Item</button>
          <button
            type="button"
            onClick={() => navigate("/create-shopping")}
            className="back-button"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateShopping;
