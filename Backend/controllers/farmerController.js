import foodModel from "../models/food.model.js"
import orderModel from "../models/order.model.js";

// all product list of a farmer

const productList = async (req, res) => {
    console.log(req.body)
    const { farmerName } = req.body;
    try {
        const products = await foodModel.find({ farmer: farmerName });
        res.json({ success: true, products })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

// get order history

const orderHistory = async (req, res) => {
    try {
        const data = await orderModel.find()
        console.log(data)
        res.json({ success: true, message: "Order History Found", data })
    } catch (error) {
        console.log(error)
        res.json({ success: true, message: "error" })
    }
}

// get inventory details

const inventory = async (req, res) => {
    try {
        const data = await foodModel.find({ farmer: req.body.farmer });
        res.json({ success: true, message: "Inventory details fetched successfully", data })
    } catch (error) {
        console.log(error)
        res.json({ succcess: false, message: "Error" })
    }
}

export { productList, orderHistory, inventory }