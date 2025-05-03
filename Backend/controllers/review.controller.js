
const Review = require('../models/review.model');
const Product = require('../models/product.model');
const Farmer = require('../models/farmer.model');
const Order = require('../models/order.model');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const { 
      product, 
      farmer, 
      user, 
      minRating,
      page = 1, 
      limit = 10 
    } = req.query;
    
    // Build query
    const query = {};
    
    if (product) {
      query.product = product;
    }
    
    if (farmer) {
      query.farmer = farmer;
    }
    
    if (user) {
      query.user = user;
    }
    
    if (minRating) {
      query.rating = { $gte: parseInt(minRating) };
    }
    
    // Add active filter
    query.isActive = true;
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const reviews = await Review.find(query)
      .populate({
        path: 'user',
        select: 'name profileImage'
      })
      .populate({
        path: 'product',
        select: 'name images'
      })
      .populate({
        path: 'farmer',
        select: 'farmName',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Review.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      },
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name profileImage'
      })
      .populate({
        path: 'product',
        select: 'name images category'
      })
      .populate({
        path: 'farmer',
        select: 'farmName',
        populate: {
          path: 'user',
          select: 'name'
        }
      });
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private/Consumer
exports.createReview = async (req, res) => {
  try {
    const { productId, orderId, rating, title, comment, images } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check if order exists and belongs to user
    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
      
      if (order.consumer.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'You can only review products from your own orders'
        });
      }
      
      // Verify product exists in order
      const productInOrder = order.items.some(item => 
        item.product.toString() === productId
      );
      
      if (!productInOrder) {
        return res.status(400).json({
          success: false,
          message: 'Product not found in this order'
        });
      }
    }
    
    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user.id,
      product: productId
    });
    
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }
    
    // Create review
    const review = await Review.create({
      user: req.user.id,
      product: productId,
      farmer: product.farmer,
      order: orderId || null,
      rating,
      title,
      comment,
      images: images || []
    });
    
    // Update product rating
    const allProductReviews = await Review.find({ product: productId });
    
    const totalRating = allProductReviews.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalRating / allProductReviews.length;
    
    await Product.findByIdAndUpdate(productId, {
      'ratings.average': averageRating,
      'ratings.count': allProductReviews.length
    });
    
    // Update farmer rating
    const allFarmerReviews = await Review.find({ farmer: product.farmer });
    
    const totalFarmerRating = allFarmerReviews.reduce((sum, item) => sum + item.rating, 0);
    const averageFarmerRating = totalFarmerRating / allFarmerReviews.length;
    
    await Farmer.findByIdAndUpdate(product.farmer, {
      'ratings.average': averageFarmerRating,
      'ratings.count': allFarmerReviews.length
    });
    
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private/Consumer
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Check if user owns this review
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }
    
    // Fields that can be updated by consumer
    const fieldsToUpdate = {};
    if (req.body.rating) fieldsToUpdate.rating = req.body.rating;
    if (req.body.title) fieldsToUpdate.title = req.body.title;
    if (req.body.comment) fieldsToUpdate.comment = req.body.comment;
    if (req.body.images) fieldsToUpdate.images = req.body.images;
    
    // Admin specific fields
    if (req.user.role === 'admin') {
      if (req.body.isActive !== undefined) fieldsToUpdate.isActive = req.body.isActive;
      if (req.body.isVerified !== undefined) fieldsToUpdate.isVerified = req.body.isVerified;
    }
    
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );
    
    // Update product rating if rating changed
    if (req.body.rating) {
      const product = await Product.findById(review.product);
      const allProductReviews = await Review.find({ product: review.product });
      
      const totalRating = allProductReviews.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = totalRating / allProductReviews.length;
      
      await Product.findByIdAndUpdate(review.product, {
        'ratings.average': averageRating,
        'ratings.count': allProductReviews.length
      });
      
      // Update farmer rating
      const allFarmerReviews = await Review.find({ farmer: product.farmer });
      
      const totalFarmerRating = allFarmerReviews.reduce((sum, item) => sum + item.rating, 0);
      const averageFarmerRating = totalFarmerRating / allFarmerReviews.length;
      
      await Farmer.findByIdAndUpdate(product.farmer, {
        'ratings.average': averageFarmerRating,
        'ratings.count': allFarmerReviews.length
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedReview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Add farmer response to review
// @route   POST /api/reviews/:id/response
// @access  Private/Farmer
exports.addFarmerResponse = async (req, res) => {
  try {
    const { text } = req.body;
    
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Check if user is the farmer who received the review
    const farmer = await Farmer.findOne({ user: req.user.id });
    
    if (!farmer || farmer._id.toString() !== review.farmer.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to respond to this review'
      });
    }
    
    // Add farmer response
    review.farmerResponse = {
      text,
      createdAt: new Date()
    };
    
    await review.save();
    
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Consumer-Admin
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Check if user owns this review or is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }
    
    await review.deleteOne();
    
    // Update product rating
    const allProductReviews = await Review.find({ product: review.product });
    
    let averageRating = 0;
    let reviewCount = 0;
    
    if (allProductReviews.length > 0) {
      const totalRating = allProductReviews.reduce((sum, item) => sum + item.rating, 0);
      averageRating = totalRating / allProductReviews.length;
      reviewCount = allProductReviews.length;
    }
    
    await Product.findByIdAndUpdate(review.product, {
      'ratings.average': averageRating,
      'ratings.count': reviewCount
    });
    
    // Update farmer rating
    const allFarmerReviews = await Review.find({ farmer: review.farmer });
    
    let farmerAverageRating = 0;
    let farmerReviewCount = 0;
    
    if (allFarmerReviews.length > 0) {
      const totalFarmerRating = allFarmerReviews.reduce((sum, item) => sum + item.rating, 0);
      farmerAverageRating = totalFarmerRating / allFarmerReviews.length;
      farmerReviewCount = allFarmerReviews.length;
    }
    
    await Farmer.findByIdAndUpdate(review.farmer, {
      'ratings.average': farmerAverageRating,
      'ratings.count': farmerReviewCount
    });
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
