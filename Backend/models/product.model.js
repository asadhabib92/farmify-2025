import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  discountPrice: {
    type: Number
  },
  unit: {
    type: String,
    required: [true, 'Please add a unit'],
    enum: ['kg', 'gram', 'piece', 'dozen', 'liter', 'ml', 'bundle']
  },
  status: {
    type: String
  },
  stock: {
    type: Number
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['vegetables', 'fruits', 'grains', 'dairy', 'meat', 'herbs', 'other']
  },
  subcategory: {
    type: String
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: [true, 'Please add a quantity'],
    default: 0
  },
  minOrderQuantity: {
    type: Number,
    default: 1
  },
  maxOrderQuantity: {
    type: Number
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
  rating: {
    type: Number,
    required: true
  },
  tags: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

const Product = mongoose.model('Product', ProductSchema);

export default Product
