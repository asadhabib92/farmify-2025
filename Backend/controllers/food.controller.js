import foodModel from "../models/food.model.js"
import fs from "fs"

const addFood = async (req, res) => {
    console.log(req.body);
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        unit: req.body.unit,
        rating: req.body.rating,
        farmer: req.body.farmer,
        category: req.body.category,
        distance: req.body.distance,
        status: req.body.status,
        image: image_filename,
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log("error is " + error);
        res.json({ success: false, message: error })
    }
}

const updateProduct = async (req, res) => {
    console.log(req.body);
    const { _id, ...rest } = req.body;
    if (req.file) {
        let image_filename = `${req.file.filename}`
        rest.image = image_filename;
    }
    try {
        const response = await foodModel.findByIdAndUpdate(_id, req.body);
        console.log(response);
        res.json({ success: true, message: "product updated" })
    } catch (error) {
        console.log("error is " + error);
        res.json({ success: false, message: error.message })
    }
}

// all food list

const foodList = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

// remove food items

const removeFood = async (req, res) => {
    console.log(req.body)
    try {
        const food = await foodModel.findById(req.body._id);
        console.log(food)
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body._id);
        res.json({ success: true, message: "Food removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


export { addFood, foodList, removeFood, updateProduct }