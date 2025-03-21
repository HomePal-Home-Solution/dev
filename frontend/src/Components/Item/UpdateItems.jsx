import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './ItemCss/UpdateItems.css';  // Adjusted path

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    ItemName: '',
    ItemImage: '',
    ItemBrand: '',
    ItemDescription: '',
    ItemPrice: 0,
    ItemCategory: '',
    ItemQuantity: 0,
    ItemStatus: ''
  });
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [errors, setErrors] = useState({}); // State to store validation error

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/item/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate ItemPrice and ItemQuantity to ensure they are not negative
    if (name === "ItemPrice" || name === "ItemQuantity") {
      if (parseFloat(value) < 0) {
        setErrors({
          ...errors,
          [name]: `${name === "ItemPrice" ? "Price" : "Quantity"} cannot be negative.`,
        });
        return; // Stop further execution if the value is negative
      } else {
        // Clear the error if the value is valid
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    }

    setItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for validation errors before submitting
    if (errors.ItemPrice || errors.ItemQuantity) {
      alert("Please fix the errors before submitting.");
      return;
    }


    // Create a FormData object to send the file and other fields
    const formData = new FormData();
    formData.append('ItemName', item.ItemName);
    if (file) {
      formData.append('ItemImage', file); // Append the file if it exists
    } else {
      formData.append('ItemImage', item.ItemImage); // Use the existing image if no new file is uploaded
    }
    formData.append('ItemBrand', item.ItemBrand);
    formData.append('ItemDescription', item.ItemDescription);
    formData.append('ItemPrice', item.ItemPrice);
    formData.append('ItemCategory', item.ItemCategory);
    formData.append('ItemQuantity', item.ItemQuantity);
    formData.append('ItemStatus', item.ItemStatus);

    try {
      const response = await axios.put(`http://localhost:5000/api/items/updateitem/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });

      if (response.status === 200) {
        alert("Item updated successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  return (
    <div className="update-item-container">
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="ItemName"
            value={item.ItemName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="ItemImage"
            onChange={handleFileChange} // Handle file selection
            accept="image/*" // Allow only image files
          />
          {item.ItemImage && (
            <div className="current-image">
              <p>Current Image:</p>
              <img
                src={`data:image/png;base64,${item.ItemImage}`} // Display the current image
                alt="Current Item"
                style={{ width: '100px', height: 'auto' }}
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            name="ItemBrand"
            value={item.ItemBrand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="ItemDescription"
            value={item.ItemDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="ItemPrice"
            value={item.ItemPrice}
            onChange={handleChange}
            required
            min = "0"
          />
          {errors.ItemPrice && <p className="error-message">{errors.ItemPrice}</p>}
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="ItemCategory"
            value={item.ItemCategory}
            onChange={handleChange}
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Furniture">Furniture</option>
            <option value="Books">Books</option>
            <option value="Food">Food</option>
            <option value="Toys">Toys</option>
            <option value="Accessories">Accessories</option>
            <option value="Shoes">Shoes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="ItemQuantity"
            value={item.ItemQuantity}
            onChange={handleChange}
            required
            min="0"
          />
          {errors.ItemQuantity && <p className="error-message">{errors.ItemQuantity}</p>}
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="ItemStatus"
            value={item.ItemStatus}
            onChange={handleChange}
            required
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <button type="submit" className="update-button">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;