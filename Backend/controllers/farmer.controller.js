
import Farmer from '../models/farmer.model.js'
import User from '../models/user.model.js'

// @desc    Get all farmers
// @route   GET /api/farmers
// @access  Public
const getFarmers = async (req, res) => {
  try {
    const { search, isVerified, applicationStatus, farmingType, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};

    if (isVerified) {
      query.isVerified = isVerified === 'true';
    }

    if (applicationStatus) {
      query.applicationStatus = applicationStatus;
    }

    if (farmingType) {
      query.farmingTypes = farmingType;
    }

    if (search) {
      query.$or = [
        { farmName: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    const farmers = await Farmer.find(query)
      .populate({
        path: 'user',
        select: 'name email phone profileImage'
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Farmer.countDocuments(query);

    res.status(200).json({
      success: true,
      count: farmers.length,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      },
      data: farmers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get single farmer
// @route   GET /api/farmers/:id
// @access  Public
const getFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id).populate({
      path: 'user',
      select: 'name email phone profileImage'
    });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: farmer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Create new farmer profile
// @route   POST /api/farmers
// @access  Private
const createFarmerProfile = async (req, res) => {
  try {
    // Check if user is already a farmer
    const existingFarmer = await Farmer.findOne({ user: req.user.id });
    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        message: 'You already have a farmer profile'
      });
    }

    // Create farmer profile
    const farmerData = {
      ...req.body,
      user: req.user.id,
      applicationStatus: 'pending'
    };

    const farmer = await Farmer.create(farmerData);

    // Update user role to farmer
    await User.findByIdAndUpdate(req.user.id, { role: 'farmer' });

    res.status(201).json({
      success: true,
      data: farmer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update farmer profile
// @route   PUT /api/farmers/:id
// @access  Private
const updateFarmerProfile = async (req, res) => {
  try {
    let farmer = await Farmer.findById(req.params.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    // Make sure user is the farmer owner or an admin
    if (farmer.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    // Fields that can be updated
    const fieldsToUpdate = { ...req.body };
    delete fieldsToUpdate.user; // Don't allow changing the user reference
    delete fieldsToUpdate.applicationStatus; // Don't allow changing application status directly

    farmer = await Farmer.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: farmer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update farmer application status
// @route   PUT /api/farmers/:id/application-status
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationStatus, rejectionReason } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(applicationStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid application status'
      });
    }

    let farmer = await Farmer.findById(req.params.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    const updateData = {
      applicationStatus,
      isVerified: applicationStatus === 'approved' ? true : false
    };

    if (applicationStatus === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    farmer = await Farmer.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    // Update the user's verification status too
    await User.findByIdAndUpdate(
      farmer.user,
      { isVerified: applicationStatus === 'approved' ? true : false }
    );

    res.status(200).json({
      success: true,
      data: farmer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

export { getFarmer, getFarmers, createFarmerProfile, updateApplicationStatus, updateFarmerProfile }