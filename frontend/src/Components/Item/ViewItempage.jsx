import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './itemCss/ViewitemPage.css';   // Import CSS for styling

const ViewItemPage = () => {
    const { id } = useParams(); // Get the item ID from the URL
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the item by ID
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/items/item/${id}`);
                if (!response.ok) {
                    throw new Error('Item not found');
                }
                const data = await response.json();
                setItem(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    // Handle item deletion
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/items/deleteitem/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            navigate('/allitem'); // Redirect to the items list page after deletion
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle navigation to the update page
    const handleUpdate = () => {
        navigate(`/updateitem/${id}`);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="view-item-container" style={{ backgroundColor: '#B0C4DE', padding: '10px', margin: '50px 150px', height: 'auto', borderRadius: '8px' }}>
            <h1>Item Details</h1>
            {item && (
                <div className="item-details">
                    <div className="item-image img">
                    <img src={`data:image/png;base64,${item.ItemImage}`} alt={item.ItemName} className="item-image img" style={{ maxWidth: "100%", height: "auto", borderRadius: "4px", marginBottom: "10px" }} />
                    </div>
                    <div className="item-info">
                        <h2>{item.ItemName}</h2>
                        <p><strong>Brand:</strong> {item.ItemBrand}</p>
                        <p><strong>Description:</strong> {item.ItemDescription}</p>
                        <p><strong>Price LKR:</strong> {item.ItemPrice}</p>
                        <p><strong>Category:</strong> {item.ItemCategory}</p>
                        <p><strong>Quantity:</strong> {item.ItemQuantity}</p>
                        <p><strong>Status:</strong> {item.ItemStatus}</p>
                    </div>
                    <div className="item-actions">
                        <button className="update-button" onClick={handleUpdate}>Update Item</button>
                        {/* <button className="delete-button" onClick={handleDelete}>Delete Item</button> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewItemPage;