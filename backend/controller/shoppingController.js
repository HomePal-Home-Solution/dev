import asyncHandler from "express-async-handler";
import Shopping from "../models/shoppingModel.js";



export const createShopping = asyncHandler(async (req, res) => {
    const shopping = await Shopping.create(req.body);
    res.status(201).json(shopping);         
});

export const viewAllShopping = asyncHandler(async(req, res) => {
    const shopping = await Shopping.find(req.body); 
    res.status(200).json(shopping); 
});

export const viewShoppingById = asyncHandler(async (req, res) => {
        const shopping = await Shopping.findById(req.params.id);
        res.status(200).json(shopping);
});

export const updateShopping = asyncHandler(async (req, res) => {
    const shopping = await Shopping.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!shopping) {
        res.status(404);
        throw new Error("Shopping not found");
    }

    res.status(200).json(shopping);
});

export const deleteShopping = asyncHandler(async (req, res) => {
    const shopping = await Shopping.findByIdAndDelete(req.params.id);

    if (!shopping) {
        res.status(404);
        throw new Error("Shopping not found");
    }

    res.status(200).json({ message: "Shopping deleted successfully" });
});