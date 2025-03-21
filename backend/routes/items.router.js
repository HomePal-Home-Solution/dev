import express from 'express';
import multer from 'multer';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controller/items.controller.js';


const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

const router = express.Router();

// Define routes for item
router.post('/createitem', upload.single('ItemImage'), createItem); // Use multer middleware for file upload
router.get('/allitem', getItems);
router.get('/item/:id', getItemById);
router.put('/updateitem/:id', upload.single('ItemImage'), updateItem); // Use multer middleware for file upload
router.delete('/deleteitem/:id', deleteItem);

export default router;
