import React, { useState } from 'react';
import './ItemCss/CreateItemForm.css';   // Import the CSS file

const CreateItemForm = () => {
    const [item, setItem] = useState({
        ItemName: '',
        ItemImage: '', // Store the base64-encoded image string
        ItemBrand: '',
        ItemDescription: '',
        ItemPrice: '',
        ItemCategory: '',
        ItemQuantity: '',
        ItemStatus: 'Available',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation for ItemPrice and ItemQuantity to ensure they are not negative
        if (name === 'ItemPrice' || name === 'ItemQuantity') {
            if (parseFloat(value) < 0) {
                setError(`${name === 'ItemPrice' ? 'Price' : 'Quantity'} cannot be negative.`);
                return;
            }
        }

        setItem({ ...item, [name]: value });
        setError(''); // Clear any previous error messages
    };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setItem({ ...item, ItemImage: reader.result }); // Set base64-encoded image string
    //         };
    //         reader.readAsDataURL(file); // Convert file to base64
    //     }
    // };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setItem({ ...item, ItemImage: file }); // Set the file directly
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        //validation for all fields
        const errors = {};
    if (!item.ItemName) errors.ItemName = 'Item Name is required';
    if (!item.ItemImage) errors.ItemImage = 'Item Image is required';
    if (!item.ItemBrand) errors.ItemBrand = 'Item Brand is required';
    if (!item.ItemDescription) errors.ItemDescription = 'Item Description is required';
    if (!item.ItemPrice) errors.ItemPrice = 'Item Price is required';
    if (!item.ItemCategory) errors.ItemCategory = 'Item Category is required';
    if (!item.ItemQuantity) errors.ItemQuantity = 'Item Quantity is required';
    if (!item.ItemStatus) errors.ItemStatus = 'Item Status is required';

    if (Object.keys(errors).length > 0) {
        setError(errors);
        return;
    }

    const formData = new FormData();
        formData.append('ItemName', item.ItemName);
        formData.append('ItemImage', item.ItemImage); // Append the file
        formData.append('ItemBrand', item.ItemBrand);
        formData.append('ItemDescription', item.ItemDescription);
        formData.append('ItemPrice', item.ItemPrice);
        formData.append('ItemCategory', item.ItemCategory);
        formData.append('ItemQuantity', item.ItemQuantity);
        formData.append('ItemStatus', item.ItemStatus);
        

        try {
            const response = await fetch('http://localhost:5000/api/items/createitem', {
                method: 'POST',
                body: formData,
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(item),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message);
                setItem({
                    ItemName: '',
                    ItemImage: '',
                    ItemBrand: '',
                    ItemDescription: '',
                    ItemPrice: '',
                    ItemCategory: '',
                    ItemQuantity: '',
                    ItemStatus: 'Available',
                });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred while creating the item.');
        }
    };

    // return (
        
    //         <div className="create-item-form">
    //             <h2 className="text-center mb-4">Create Item</h2>
    //             {error && <div className="error">{error}</div>}
    //             {success && <div className="success">{success}</div>}
    //             <form onSubmit={handleSubmit}>
    //                 <div className="form-group">
    //                     <label htmlFor="ItemName">Item Name</label>
    //                     <input
    //                         type="text"
    //                         id="ItemName"
    //                         name="ItemName"
    //                         placeholder="Item Name"
    //                         value={item.ItemName}
    //                         onChange={handleChange}
    //                         required
    //                     />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="ItemImage">Item Image</label>
    //                     <input
    //                         type="file"
    //                         id="ItemImage"
    //                         name="ItemImage"
    //                         onChange={handleImageChange}
    //                         accept="image/*"
    //                         required
    //                     />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="ItemBrand">Item Brand</label>
    //                     <input
    //                         type="text"
    //                         id="ItemBrand"
    //                         name="ItemBrand"
    //                         placeholder="Item Brand"
    //                         value={item.ItemBrand}
    //                         onChange={handleChange}
    //                         required
    //                     />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="ItemDescription">Item Description</label>
    //                     <textarea
    //                         id="ItemDescription"
    //                         name="ItemDescription"
    //                         placeholder="Item Description"
    //                         value={item.ItemDescription}
    //                         onChange={handleChange}
    //                         required
    //                     />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="ItemPrice">Item Price</label>
    //                     <input
    //                         type="number"
    //                         id="ItemPrice"
    //                         name="ItemPrice"
    //                         placeholder="Item Price"
    //                         value={item.ItemPrice}
    //                         onChange={handleChange}
    //                         required
    //                         min="0"
    //                     />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="ItemCategory">Item Category</label>
    //                     <select
    //                         id="ItemCategory"
    //                         name="ItemCategory"
    //                         value={item.ItemCategory}
    //                         onChange={handleChange}
    //                         required
    //                     >
    //                         <option value="">Select Category</option>
    //                         <option value="Electronics">Electronics</option>
    //                         <option value="Clothes">Clothes</option>
    //                         <option value="Furniture">Furniture</option>
    //                         <option value="Books">Books</option>
    //                         <option value="Food">Food</option>
    //                         <option value="Toys">Toys</option>
    //                         <option value="Accessories">Accessories</option>
    //                         <option value="Shoes">Shoes</option>

    //                     </select>
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="ItemQuantity">Item Quantity</label>
    //                     <input
    //                         type="number"
    //                         id="ItemQuantity"
    //                         name="ItemQuantity"
    //                         placeholder="Item Quantity"
    //                         value={item.ItemQuantity}
    //                         onChange={handleChange}
    //                         required
    //                         min="0"
    //                     />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="ItemStatus">Item Status</label>
    //                     <select
    //                         id="ItemStatus"
    //                         name="ItemStatus"
    //                         value={item.ItemStatus}
    //                         onChange={handleChange}
    //                         required
    //                     >
    //                         <option value="Available">Available</option>
    //                         <option value="Out of Stock">Out of Stock</option>
    //                     </select>
    //                 </div>
    //                 <button type="submit" className="btn-primary">Create Item</button>
    //             </form>
    //         </div>
        
    // );


    return (
        <div className="create-item-form">
            <h2 className="text-center mb-4">Create Item</h2>
            {success && <div className="success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ItemName">Item Name</label>
                    <input
                        type="text"
                        id="ItemName"
                        name="ItemName"
                        placeholder="Item Name"
                        value={item.ItemName}
                        onChange={handleChange}
                        required
                    />
                    {error.ItemName && <div className="error-message">{error.ItemName}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="ItemImage">Item Image</label>
                    <input
                        type="file"
                        id="ItemImage"
                        name="ItemImage"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                    {error.ItemImage && <div className="error-message">{error.ItemImage}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="ItemBrand">Item Brand</label>
                    <input
                        type="text"
                        id="ItemBrand"
                        name="ItemBrand"
                        placeholder="Item Brand"
                        value={item.ItemBrand}
                        onChange={handleChange}
                        required
                    />
                    {error.ItemBrand && <div className="error-message">{error.ItemBrand}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="ItemDescription">Item Description</label>
                    <textarea
                        id="ItemDescription"
                        name="ItemDescription"
                        placeholder="Item Description"
                        value={item.ItemDescription}
                        onChange={handleChange}
                        required
                    />
                    {error.ItemDescription && <div className="error-message">{error.ItemDescription}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="ItemPrice">Item Price</label>
                    <input
                        type="number"
                        id="ItemPrice"
                        name="ItemPrice"
                        placeholder="Item Price"
                        value={item.ItemPrice}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                    {error.ItemPrice && <div className="error-message">{error.ItemPrice}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="ItemCategory">Item Category</label>
                    <select
                        id="ItemCategory"
                        name="ItemCategory"
                        value={item.ItemCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Books">Books</option>
                        <option value="Food">Food</option>
                        <option value="Toys">Toys</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Shoes">Shoes</option>
                    </select>
                    {error.ItemCategory && <div className="error-message">{error.ItemCategory}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="ItemQuantity">Item Quantity</label>
                    <input
                        type="number"
                        id="ItemQuantity"
                        name="ItemQuantity"
                        placeholder="Item Quantity"
                        value={item.ItemQuantity}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                    {error.ItemQuantity && <div className="error-message">{error.ItemQuantity}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="ItemStatus">Item Status</label>
                    <select
                        id="ItemStatus"
                        name="ItemStatus"
                        value={item.ItemStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                    {error.ItemStatus && <div className="error-message">{error.ItemStatus}</div>}
                </div>
                <button type="submit" className="btn-primary">Create Item</button>
            </form>
        </div>
    );
};

export default CreateItemForm;