import User from '../models/user.model.js';

const getUserDetails = async (req, res) => {
    try {
        const data = await User.find();
        console.log(data);
        res.json({ success: true, message: "data fetched successfully", data })
    } catch (error) {
        console.log(error);
        res.json({ success: true, message: "Error" })
    }
}

const deleteUser = async (req, res) => {
    const params = req.params._id
    try {
        const data = await User.findByIdAndDelete(params);
        console.log(data);
        res.json({ success: true, message: "User Deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "User Not Deleted" })
    }
}

const suspendUser = async (req, res) => {
    const params = req.params._id
    try {
        const data = await User.findByIdAndUpdate(params, { status: "Suspended" });
        console.log(data);
        res.json({ success: true, message: "User Suspended" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "User Not Suspended" })
    }
}

const activateUser = async (req, res) => {
    const params = req.params._id
    try {
        const data = await User.findByIdAndUpdate(params, { status: "Active" });
        console.log(data);
        res.json({ success: true, message: "User Activated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "User Not Activated" })
    }
}

export { getUserDetails, deleteUser, suspendUser, activateUser }