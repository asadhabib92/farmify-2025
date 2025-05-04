
import Payment from '../models/payment.model.js'
import Order from '../models/order.model.js'
import Farmer from '../models/farmer.model.js'
import User from '../models/user.model.js'

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
const getPayments = async (req, res) => {
  try {
    const {
      type,
      method,
      status,
      fromDate,
      toDate,
      page = 1,
      limit = 10
    } = req.query;

    // Build query based on user role
    const query = {};

    if (req.user.role === 'farmer') {
      // Find farmer profile
      const farmer = await Farmer.findOne({ user: req.user.id });
      if (farmer) {
        query.$or = [
          { recipient: req.user.id },
          { sender: req.user.id }
        ];
      } else {
        return res.status(404).json({
          success: false,
          message: 'Farmer profile not found'
        });
      }
    } else if (req.user.role === 'consumer') {
      // Consumers can only see their own payments
      query.$or = [
        { recipient: req.user.id },
        { sender: req.user.id }
      ];
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by method
    if (method) {
      query.method = method;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by date range
    if (fromDate && toDate) {
      query.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const payments = await Payment.find(query)
      .populate({
        path: 'order',
        select: 'orderNumber'
      })
      .populate({
        path: 'recipient',
        select: 'name email'
      })
      .populate({
        path: 'sender',
        select: 'name email'
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Payment.countDocuments(query);

    res.status(200).json({
      success: true,
      count: payments.length,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      },
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate({
        path: 'order',
        select: 'orderNumber items total'
      })
      .populate({
        path: 'recipient',
        select: 'name email'
      })
      .populate({
        path: 'sender',
        select: 'name email'
      });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check if user is authorized to view this payment
    if (req.user.role !== 'admin') {
      if (
        (payment.recipient && payment.recipient._id.toString() !== req.user.id) &&
        (payment.sender && payment.sender._id.toString() !== req.user.id)
      ) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this payment'
        });
      }
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Process payment for order
// @route   POST /api/payments/process-order
// @access  Private/Consumer
const processOrderPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, transactionDetails } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Verify that the consumer owns this order
    if (order.consumer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to process payment for this order'
      });
    }

    // Create payment record
    const payment = await Payment.create({
      order: order._id,
      amount: order.total,
      type: 'credit', // Credit to platform
      method: paymentMethod,
      status: 'Completed',
      sender: req.user.id,
      recipient: null, // Platform account
      transactionDetails,
      description: `Payment for order ${order.orderNumber}`
    });

    // Update order payment status
    order.paymentStatus = 'paid';
    order.paymentDetails = {
      transactionId: payment.paymentId,
      paymentDate: new Date()
    };

    await order.save();

    res.status(201).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Process payout to farmer
// @route   POST /api/payments/payout
// @access  Private/Admin
const processPayout = async (req, res) => {
  try {
    const { farmerId, amount, description } = req.body;

    // Validate farmer exists
    const farmer = await Farmer.findById(farmerId).populate('user');
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    // Create payment record
    const payment = await Payment.create({
      amount,
      type: 'debit', // Debit from platform
      method: 'bank_transfer',
      status: 'Completed',
      sender: null, // Platform account
      recipient: farmer.user._id,
      description: description || `Payout to ${farmer.farmName}`,
      transactionDetails: {
        paymentGateway: 'Bank Transfer'
      }
    });

    res.status(201).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Request payout (for farmers)
// @route   POST /api/payments/request-payout
// @access  Private/Farmer
const requestPayout = async (req, res) => {
  try {
    const { amount } = req.body;

    // Find farmer profile
    const farmer = await Farmer.findOne({ user: req.user.id });
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer profile not found'
      });
    }

    // Validate minimum payout amount (example: 500)
    if (amount < 500) {
      return res.status(400).json({
        success: false,
        message: 'Minimum payout amount is ₹500'
      });
    }

    // Create payment request
    const payment = await Payment.create({
      amount,
      type: 'debit', // Debit from platform
      method: 'bank_transfer',
      status: 'Pending', // Admin needs to approve
      sender: null, // Platform account
      recipient: req.user.id,
      description: `Payout request from ${farmer.farmName}`
    });

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payout request submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id/status
// @access  Private/Admin
const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!['Pending', 'Completed', 'Failed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status'
      });
    }

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Update payment status
    payment.status = status;

    // If this is an order payment, update order payment status too
    if (payment.order) {
      const order = await Order.findById(payment.order);
      if (order) {
        order.paymentStatus = status === 'Completed' ? 'paid' :
          status === 'Failed' ? 'failed' : 'pending';
        await order.save();
      }
    }

    await payment.save();

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

export { getPayment, getPayments, processOrderPayment, processPayout, requestPayout, updatePaymentStatus }