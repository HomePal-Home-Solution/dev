import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../Shopping/shopping.css/UpdateShopping.css";

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
      toast.error("Failed to fetch item");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent negative/zero in quantity input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      // Only allow positive integers
      const cleanValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: cleanValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Prevent submission if quantity is not a positive number
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.quantity || Number(formData.quantity) < 1) {
      toast.error("Quantity must be a positive number.");
      return;
    }
    try {
      await axios.put(`/api/shopping/update/${id}`, formData);
      toast.success("Item updated successfully!");
      navigate("/create-shopping");
    } catch (error) {
      toast.error("Failed to update item");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="update-shopping-container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: 'hot-toast',
          success: { className: 'hot-toast-success' },
          error: { className: 'hot-toast-error' },
        }}
      />
      <h2 className="heading">Update Shopping Item</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          className="input-field"
          disabled
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input-field"
          required
          min="1"
          onKeyDown={e => (e.key === '-' || e.key === 'e') && e.preventDefault()}
        />
        <input
          type="text"
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          className="input-field"
          disabled
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          className="input-field"
          disabled
        />
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
          className="textarea-field"
        />
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
