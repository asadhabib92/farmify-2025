
const Product = require('../models/product.model');
const Farmer = require('../models/farmer.model');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { 
      category, 
      subcategory, 
      farmer, 
      search, 
      minPrice, 
      maxPrice, 
      organic,
      inStock,
      sort,
      page = 1, 
      limit = 12 
    } = req.query;
    
    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (subcategory) {
      query.subcategory = subcategory;
    }
    
    if (farmer) {
      query.farmer = farmer;
    }
    
    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }
    
    if (organic) {
      query.organic = organic === 'true';
    }
    
    if (inStock) {
      query.inStock = inStock === 'true';
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Sorting
    let sortOptions = { createdAt: -1 }; // Default sort by newest
    if (sort) {
      switch (sort) {
        case 'price-low':
          sortOptions = { price: 1 };
          break;
        case 'price-high':
          sortOptions = { price: -1 };
          break;
        case 'rating':
          sortOptions = { 'ratings.average': -1 };
          break;
      }
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .populate({
        path: 'farmer',
        select: 'farmName farmLocation ratings',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sortOptions);
    
    const total = await Product.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: products.length,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      },
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: 'farmer',
        select: 'farmName farmLocation ratings user',
        populate: {
          path: 'user',
          select: 'name profileImage'
        }
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name profileImage'
        }
      });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Farmer
exports.createProduct = async (req, res) => {
  try {
    // Find the farmer profile for the current user
    const farmer = await Farmer.findOne({ user: req.user.id });
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer profile not found for this user'
      });
    }
    
    // Check if farmer is verified
    if (!farmer.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Your farmer account must be verified before adding products'
      });
    }
    
    // Create product
    const productData = {
      ...req.body,
      farmer: farmer._id
    };
    
    const product = await Product.create(productData);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Farmer
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Find the farmer profile for the current user
    const farmer = await Farmer.findOne({ user: req.user.id });
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer profile not found for this user'
      });
    }
    
    // Check if user is the product owner or an admin
    if (product.farmer.toString() !== farmer._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }
    
    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Farmer
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Find the farmer profile for the current user
    const farmer = await Farmer.findOne({ user: req.user.id });
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer profile not found for this user'
      });
    }
    
    // Check if user is the product owner or an admin
    if (product.farmer.toString() !== farmer._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }
    
    await product.deleteOne();
    
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
