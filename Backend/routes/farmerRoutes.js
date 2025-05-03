import express from "express"
import { inventory, orderHistory, productList } from "../controllers/farmerController.js";
import multer from "multer";

const farmerRouter = express.Router();

farmerRouter.post('/product-list', productList);
farmerRouter.get('/order-history', orderHistory);
farmerRouter.post('/inventory', inventory)
// farmerRouter.post('/update', updateProduct);

export default farmerRouter;