import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema({

    ItemName: {
        type: String,
        required: [true, "Item name is required"],
        trim: true
    },

    ItemImage: {
        type: String,
        required: [true, "Item image URL is required"]
    },

    ItemBrand: {
        type: String,
        required: [true, "Item brand is required"]
    },

    ItemDescription: {
        type: String,
        required: [true, "Item description is required"]
    },

    ItemPrice: {
        type: Number,
        required: [true, "Item price is required"],
        min: [0, "Item price cannot be negative"]
    },

    ItemCategory: {
        type: String,
        enum: ['Electronics', 'Clothes', 'Furniture', 'Books', 'Food', 'Toys', 'Accessories', 'Shoes'],
        required: [true, "Item category is required"]
    },

    ItemQuantity: {
        type: Number,
        required: [true, "Item quantity is required"],
        min: [0, "Item quantity cannot be negative"]
    },

    ItemStatus: {
        type: String,
        required: [true, "Item status is required"],
        enum: ['Available', 'Out of Stock']
    },

    BuyDate: {
        type: Date,
        default: Date.now
    }

});

const Item = mongoose.model('Item', itemSchema);
export default Item;
