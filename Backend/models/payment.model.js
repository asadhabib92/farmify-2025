
import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    unique: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  method: {
    type: String,
    enum: ['cod', 'card', 'upi', 'bank_transfer', 'platform_fee', 'refund'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  transactionDetails: {
    transactionId: String,
    paymentGateway: String,
    gatewayResponse: Object
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  metadata: {
    type: Object
  }
}, {
  timestamps: true
});

// Generate payment ID before saving
PaymentSchema.pre('save', async function (next) {
  if (!this.paymentId) {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const latestPayment = await this.constructor.findOne().sort('-createdAt');
    let sequence = '0001';

    if (latestPayment && latestPayment.paymentId) {
      const lastSequence = parseInt(latestPayment.paymentId.substr(-4));
      sequence = (lastSequence + 1).toString().padStart(4, '0');
    }

    this.paymentId = `PAY-${year}${month}${day}-${sequence}`;
  }

  next();
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;