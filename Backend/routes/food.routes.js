import { addFood, foodList, removeFood, updateProduct } from "../controllers/food.controller.js";
import express from "express"
import multer from "multer"

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.post("/update", upload.single("image"), updateProduct)
foodRouter.get("/list", foodList)
foodRouter.post("/remove", removeFood)

export default foodRouter;