import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Shopping/shopping.css/CreateShopping.css";

const CreateShopping = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    unit: "",
    category: "",
    priority: "low",
    description: "",
  });
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("itemName");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/api/shopping/view");
      const sortedItems = response.data.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      setItems(sortedItems);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/shopping/create", formData);
      setFormData({ itemName: "", quantity: "", unit: "", category: "", priority: "low", description: "" });
      fetchItems();
    } catch (error) {
      console.error("Error creating item", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shopping/delete/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const filteredItems = items.filter(item =>
    item[searchType]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="heading">Create Shopping Item</h2>

      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="itemName" placeholder="Item Name" value={formData.itemName} onChange={handleChange} className="input" required />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="input" required />
        <input type="text" name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} className="input" required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="input" required />
        <select name="priority" value={formData.priority} onChange={handleChange} className="select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="textarea" />
        <button type="submit" className="btn-add">Add Item</button>
      </form>

      <div className="search-container">
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="select">
          <option value="itemName">Item Name</option>
          <option value="priority">Priority</option>
          <option value="category">Category</option>
        </select>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="input"
        />
      </div>

      <h2 className="heading">Shopping List</h2>
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Item Name</th>
            <th className="table-cell">Quantity</th>
            <th className="table-cell">Category</th>
            <th className="table-cell">Description</th>
            <th className="table-cell">Priority</th>
            <th className="table-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item._id} className="table-row">
              <td className="table-cell">{item.itemName}</td>
              <td className="table-cell">{item.quantity}</td>
              <td className="table-cell">{item.category}</td>
              <td className="table-cell">{item.description}</td>
              <td className={`table-cell priority-${item.priority}`}>
                {item.priority}
              </td>
              <td className="table-cell">
                <button onClick={() => navigate(`/create-shopping/update/${item._id}`)} className="btn-update">Update</button>
                <button onClick={() => handleDelete(item._id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateShopping;
