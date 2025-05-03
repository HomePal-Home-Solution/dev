import Item from '../models/items.js';
import multer from 'multer';

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });


// Create a new item
export const createItem = async (req, res) => {
    try {
        console.log("Received request:", req.body); // Log the incoming request

        const { ItemName, ItemBrand, ItemDescription, ItemPrice, ItemCategory, ItemQuantity, ItemStatus } = req.body;


        // Convert the uploaded file to a base64 string
        const ItemImage = req.file ? req.file.buffer.toString('base64') : null;

        // Check if the item already exists
        const existingItem = await Item.findOne({ ItemName });
        if (existingItem) {
            existingItem.ItemQuantity += parseInt(ItemQuantity);
            existingItem.ItemStatus = existingItem.ItemQuantity > 0 ? 'Available' : 'Out of Stock';
            await existingItem.save();

            console.log("Updated existing item:", existingItem); // Log successful update
            return res.status(200).json({ message: "Item quantity updated successfully", item: existingItem });
        }

        // Create a new item
        const newItem = new Item({
            ItemName,
            ItemImage,
            ItemBrand,
            ItemDescription,
            ItemPrice,
            ItemCategory,
            ItemQuantity,
            ItemStatus,
        });

        await newItem.save();
        console.log("Item saved successfully:", newItem); // Log successful save

        res.status(201).json({ message: "Item created successfully", item: newItem });
    } catch (error) {
        console.error("Error creating item:", error);  // Log the error to the terminal
        res.status(400).json({ message: error.message });
    }
};


// Get all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        // Format items to include _id first
        const formattedItems = items.map(item => ({
            _id: item._id,
            ...item._doc
        }));
        res.status(200).json(formattedItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single item by ID
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Format the item to include _id first
        const responseItem = {
            _id: item._id,
            ...item._doc
        };

        res.status(200).json(responseItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an item by ID

// export const updateItem = async (req, res) => {
//     try {

//         const { ItemName, ItemBrand, ItemDescription, ItemPrice, ItemCategory, ItemQuantity, ItemStatus } = req.body;

//         // Convert the uploaded file to a base64 string (if a new file is uploaded)
//         const ItemImage = req.file ? req.file.buffer.toString('base64') : req.body.ItemImage;

//         const updatedItem = await Item.findByIdAndUpdate( req.params.id,
//             {
//                 ItemName,
//                 ItemImage, // Update the base64-encoded image string
//                 ItemBrand,
//                 ItemDescription,
//                 ItemPrice,
//                 ItemCategory,
//                 ItemQuantity,
//                 ItemStatus,
                
//             },
//             { new: true }
//         );
//         if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

//         // Update status if quantity is 0
//         if (updatedItem.ItemQuantity === 0) {
//             updatedItem.ItemStatus = 'Out of Stock';
//             await updatedItem.save();
//         }

//         // Format the updated item to include _id first
//         const responseItem = {
//             _id: updatedItem._id,
//             ...updatedItem._doc
//         };

//         res.status(200).json({ message: "Item updated successfully", item: responseItem });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

export const updateItem = async (req, res) => {
    try {
        const { ItemName, ItemBrand, ItemDescription, ItemPrice, ItemCategory, ItemQuantity, ItemStatus } = req.body;

        // Find the existing item first
        const existingItem = await Item.findById(req.params.id);
        if (!existingItem) return res.status(404).json({ message: 'Item not found' });

        // Prepare update data
        const updateData = {
            ItemName,
            ItemBrand,
            ItemDescription,
            ItemPrice,
            ItemCategory,
            ItemQuantity,
            ItemStatus,
        };

        // Only update image if a new file is uploaded
        if (req.file) {
            updateData.ItemImage = req.file.buffer.toString('base64');
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        // Update status based on quantity
        if (updatedItem.ItemQuantity === 0) {
            updatedItem.ItemStatus = 'Out of Stock';
            await updatedItem.save();
        }

        res.status(200).json({ message: "Item updated successfully", item: updatedItem });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(400).json({ message: error.message });
    }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};