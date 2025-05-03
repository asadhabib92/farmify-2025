import userModel from "../models/user.model.js";

const addToCart = async (req, res) => {
    try {
        console.log(req.body)
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.productId]) {
            cartData[req.body.productId] = 1;
        }
        else {
            cartData[req.body.productId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.productId] > 0) {
            cartData[req.body.productId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const getCartData = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export { addToCart, removeFromCart, getCartData }