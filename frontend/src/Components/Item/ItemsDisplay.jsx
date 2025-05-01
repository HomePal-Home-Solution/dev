import React, { useEffect, useState } from "react";
import axios from "axios";
import './ItemCss/itemsall.css'; 
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ItemsDisplay = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [outOfStockItems, setOutOfStockItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const sum = items.reduce((acc, item) => acc + (item.ItemPrice * item.ItemQuantity), 0);
    setTotalPrice(sum);

    const totalCount = items.reduce((acc, item) => acc + item.ItemQuantity, 0);
    setTotalItems(totalCount);

    const outOfStock = items.filter((item) => item.ItemQuantity === 0);
    setOutOfStockItems(outOfStock);
  }, [items]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items/allitem");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/items/deleteitem/${id}`);
        setItems(items.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const filteredItems = items.filter((item) =>
    item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Inventory Report", 10, 10);
    doc.setFontSize(12);
    doc.text(`Total Items in Inventory: ${totalItems}`, 10, 20);
    doc.text(`Total Inventory Value: LKR${totalPrice.toFixed(2)}`, 10, 30);

    const headers = [["Name", "Brand", "Category", "Price", "Quantity", "Status"]];
    const data = items.map((item) => [
      item.ItemName,
      item.ItemBrand,
      item.ItemCategory,
      `LKR ${item.ItemPrice}`,
      item.ItemQuantity,
      item.ItemQuantity === 0 ? "Out of Stock" : item.ItemStatus,
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 40,
    });

    doc.save("inventory_report.pdf");
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "left", marginRight: "230px", color: "Blue" }}>All Items In My Home</h2>
      

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Items by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="inventory-summary">
        <div className="total-items">
          <h3>Total Items in Inventory: {totalItems}</h3>
        </div>
        <div className="total-price">
          <h3>Total Inventory Value: LKR {totalPrice.toFixed(2)}</h3>
        </div>
      </div>

      {outOfStockItems.length > 0 && (
        <div className="out-of-stock-notification">
          <h4>Out of Stock Items: {outOfStockItems.length}</h4>
          {outOfStockItems.map((item) => (
            <div key={item._id} className="notification-item">
              <span className="notification-text">
                {item.ItemName} is out of stock. Please fill the stock.
              </span>
            </div>
          ))}
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price LKR</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={`data:image/png;base64,${item.ItemImage}`} alt={item.ItemName} className="item-image" />
              </td>
              <td>{item.ItemName}</td>
              <td>{item.ItemBrand}</td>
              <td>{item.ItemCategory}</td>
              <td>{item.ItemPrice}</td>
              <td>{item.ItemQuantity}</td>
              <td>
                {item.ItemQuantity === 0 ? (
                  <button className="out-of-stock-btn">Out of Stock</button>
                ) : (
                  <button className="in-stock-btn">Available</button>
                )}
              </td>
              <td>
                <Link to={`/item/${item._id}`}>
                  <button className="view">View</button>
                </Link>
                <Link to={`/updateitem/${item._id}`}>
                  <button className="update">Update</button>
                </Link>
                <button className="delete" onClick={() => deleteItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <Link to="/createitem">
          <button className="create-button">Create Item</button>
        </Link>
        <button className="report-button" onClick={generateReport}>
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default ItemsDisplay;