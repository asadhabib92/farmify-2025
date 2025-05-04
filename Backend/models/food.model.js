import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number
    },
    unit: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    farmer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        // required: [true, 'Please add a quantity'],
        default: 1
    },
    minOrderQuantity: {
        type: Number,
        default: 1
    },
    maxOrderQuantity: {
        type: Number
    },
    stock: {
        type: Number
    },
    status: {
        type: String
    },
    organic: {
        type: Boolean,
        default: false
    },
    harvestedAt: {
        type: Date
    },
    expiryDate: {
        type: Date
    },
    inStock: {
        type: Boolean,
        default: true
    },
    tags: [{
        type: String
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    currentStock: {
        type: Number
    },
    minimumStock: {
        type: Number
    },
    trend: {
        type: String
    }
});

const foodModel = mongoose.model("food", foodSchema);

export default foodModel;