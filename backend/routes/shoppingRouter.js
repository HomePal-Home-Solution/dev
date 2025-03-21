import express from 'express';
import { createShopping,viewAllShopping,viewShoppingById,updateShopping,deleteShopping } from '../controller/shoppingController.js';

const router = express.Router();

router.post('/create', createShopping);
router.get('/view', viewAllShopping);
router.get('/view/:id', viewShoppingById);
router.put('/update/:id', updateShopping);
router.delete('/delete/:id', deleteShopping);


export default router;