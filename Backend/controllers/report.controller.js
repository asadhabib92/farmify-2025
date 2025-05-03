
const Report = require('../models/report.model');
const Farmer = require('../models/farmer.model');
const mongoose = require('mongoose');

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private/Admin
exports.getReports = async (req, res) => {
  try {
    const { 
      status, 
      type, 
      priority, 
      page = 1, 
      limit = 10 
    } = req.query;
    
    // Build query
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const reports = await Report.find(query)
      .populate({
        path: 'reporter',
        select: 'name email'
      })
      .populate({
        path: 'assignedTo',
        select: 'name email'
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Report.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: reports.length,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      },
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Private/Admin
exports.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate({
        path: 'reporter',
        select: 'name email'
      })
      .populate({
        path: 'assignedTo',
        select: 'name email'
      })
      .populate({
        path: 'comments.user',
        select: 'name email'
      });
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Create new report
// @route   POST /api/reports
// @access  Private
exports.createReport = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      reportedEntity, 
      reportedEntityName,
      type, 
      priority 
    } = req.body;
    
    // Create report
    const report = await Report.create({
      title,
      description,
      reporter: req.user.id,
      reportedEntity,
      reportedEntityName,
      type,
      priority: priority || 'Medium',
      status: 'Open'
    });
    
    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update report status and priority
// @route   PUT /api/reports/:id
// @access  Private/Admin
exports.updateReport = async (req, res) => {
  try {
    const { status, priority, assignedTo } = req.body;
    
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Update fields
    if (status) report.status = status;
    if (priority) report.priority = priority;
    if (assignedTo) report.assignedTo = assignedTo;
    
    await report.save();
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Add comment to report
// @route   POST /api/reports/:id/comments
// @access  Private/Admin
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Add comment
    report.comments.push({
      text,
      user: req.user.id
    });
    
    await report.save();
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Resolve report
// @route   PUT /api/reports/:id/resolve
// @access  Private/Admin
exports.resolveReport = async (req, res) => {
  try {
    const { resolutionText } = req.body;
    
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Update report
    report.status = 'Resolved';
    report.resolution = {
      text: resolutionText,
      resolvedBy: req.user.id,
      resolvedAt: new Date()
    };
    
    await report.save();
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
