
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',

  },
  quantity: {
    type: Number,

  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  consumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

  },
  items: [OrderItemSchema],
  farmers: [{
    type: Array,
    ref: 'Farmer'
  }],
  subTotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    default: 0
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'card', 'upi', 'bank_transfer'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    transactionId: String,
    paymentDate: Date,
    paymentProof: String
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'processing', 'packed', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'placed'
  },
  estimatedDeliveryDate: {
    type: Date
  },
  actualDeliveryDate: {
    type: Date
  },
  trackingNumber: String,
  trackingUrl: String,
  notes: String,
  cancellationReason: String,
  returnReason: String
}, {
  timestamps: true
});

// Generate order number before saving
OrderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const latestOrder = await this.constructor.findOne().sort('-createdAt');
    let sequence = '0001';

    if (latestOrder && latestOrder.orderNumber) {
      const lastSequence = parseInt(latestOrder.orderNumber.substr(-4));
      sequence = (lastSequence + 1).toString().padStart(4, '0');
    }

    this.orderNumber = `FMF-${year}${month}${day}-${sequence}`;
  }

  next();
});

module.exports = mongoose.model('Order', OrderSchema);
