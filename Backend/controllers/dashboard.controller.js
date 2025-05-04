
import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
import User from '../models/user.model.js'
import Payment from '../models/payment.model.js'
import Farmer from '../models/farmer.model.js'
import Report from '../models/report.model.js'
import mongoose from 'mongoose'

// @desc    Get admin dashboard stats
// @route   GET /api/dashboard/admin
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    // Total users count by role
    const userStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const userCounts = {
      total: 0,
      consumer: 0,
      farmer: 0,
      admin: 0
    };

    userStats.forEach(stat => {
      userCounts[stat._id] = stat.count;
      userCounts.total += stat.count;
    });

    // Farmer application stats
    const farmerStats = await Farmer.aggregate([
      {
        $group: {
          _id: '$applicationStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const farmerCounts = {
      total: userCounts.farmer,
      pending: 0,
      approved: 0,
      rejected: 0
    };

    farmerStats.forEach(stat => {
      farmerCounts[stat._id] = stat.count;
    });

    // Product stats
    const productCount = await Product.countDocuments();
    const outOfStockCount = await Product.countDocuments({ inStock: false });

    // Order stats
    const orderCount = await Order.countDocuments();

    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const orderCounts = {
      total: orderCount,
      placed: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };

    orderStats.forEach(stat => {
      if (orderCounts.hasOwnProperty(stat._id)) {
        orderCounts[stat._id] = stat.count;
      }
    });

    // Revenue stats
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: 'cancelled' },
          createdAt: { $gte: firstDayOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    const totalRevenue = await Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    // Report stats
    const reportStats = await Report.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const reportCounts = {
      total: await Report.countDocuments(),
      Open: 0,
      'In Progress': 0,
      Resolved: 0,
      Closed: 0
    };

    reportStats.forEach(stat => {
      reportCounts[stat._id] = stat.count;
    });

    // Get charts data - monthly orders
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      last6Months.push(month);
    }

    const monthlyOrdersData = await Promise.all(last6Months.map(async (month) => {
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const count = await Order.countDocuments({
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      });

      return {
        month: month.toLocaleString('default', { month: 'short' }),
        year: month.getFullYear().toString().substr(-2),
        count
      };
    }));

    res.status(200).json({
      success: true,
      data: {
        users: userCounts,
        farmers: farmerCounts,
        products: {
          total: productCount,
          outOfStock: outOfStockCount
        },
        orders: orderCounts,
        revenue: {
          monthly: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0,
          total: totalRevenue.length > 0 ? totalRevenue[0].total : 0
        },
        reports: reportCounts,
        charts: {
          monthlyOrders: monthlyOrdersData
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get farmer dashboard stats
// @route   GET /api/dashboard/farmer
// @access  Private/Farmer
const getFarmerStats = async (req, res) => {
  try {
    // Find farmer profile
    const farmer = await Farmer.findOne({ user: req.user.id });
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer profile not found'
      });
    }

    // Product stats
    const productCount = await Product.countDocuments({ farmer: farmer._id });
    const outOfStockCount = await Product.countDocuments({
      farmer: farmer._id,
      inStock: false
    });

    // Top selling products
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $match: {
          'productDetails.farmer': farmer._id
        }
      },
      {
        $group: {
          _id: '$items.product',
          productName: { $first: '$productDetails.name' },
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    // Order stats
    const orderStats = await Order.aggregate([
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $match: {
          'productDetails.farmer': farmer._id
        }
      },
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const orderCounts = {
      total: 0,
      placed: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };

    orderStats.forEach(stat => {
      if (orderCounts.hasOwnProperty(stat._id)) {
        orderCounts[stat._id] = stat.count;
        orderCounts.total += stat.count;
      }
    });

    // Revenue stats
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const monthlyRevenue = await Order.aggregate([
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $match: {
          'productDetails.farmer': farmer._id,
          orderStatus: { $ne: 'cancelled' },
          createdAt: { $gte: firstDayOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      }
    ]);

    const totalRevenue = await Order.aggregate([
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $match: {
          'productDetails.farmer': farmer._id,
          orderStatus: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      }
    ]);

    // Get charts data - monthly sales
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      last6Months.push(month);
    }

    const monthlySalesData = await Promise.all(last6Months.map(async (month) => {
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const result = await Order.aggregate([
        { $unwind: '$items' },
        {
          $lookup: {
            from: 'products',
            localField: 'items.product',
            foreignField: '_id',
            as: 'productDetails'
          }
        },
        { $unwind: '$productDetails' },
        {
          $match: {
            'productDetails.farmer': farmer._id,
            orderStatus: { $ne: 'cancelled' },
            createdAt: {
              $gte: startOfMonth,
              $lte: endOfMonth
            }
          }
        },
        {
          $group: {
            _id: null,
            revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
            orders: { $sum: 1 }
          }
        }
      ]);

      return {
        month: month.toLocaleString('default', { month: 'short' }),
        year: month.getFullYear().toString().substr(-2),
        revenue: result.length > 0 ? result[0].revenue : 0,
        orders: result.length > 0 ? result[0].orders : 0
      };
    }));

    res.status(200).json({
      success: true,
      data: {
        products: {
          total: productCount,
          outOfStock: outOfStockCount
        },
        topProducts,
        orders: orderCounts,
        revenue: {
          monthly: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0,
          total: totalRevenue.length > 0 ? totalRevenue[0].total : 0
        },
        farmer: {
          farmName: farmer.farmName,
          isVerified: farmer.isVerified,
          rating: farmer.ratings.average
        },
        charts: {
          monthlySales: monthlySalesData
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get consumer dashboard stats
// @route   GET /api/dashboard/consumer
// @access  Private/Consumer
const getConsumerStats = async (req, res) => {
  try {
    // Order stats
    const orderCount = await Order.countDocuments({ consumer: req.user.id });

    const orderStats = await Order.aggregate([
      {
        $match: {
          consumer: mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const orderCounts = {
      total: orderCount,
      placed: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };

    orderStats.forEach(stat => {
      if (orderCounts.hasOwnProperty(stat._id)) {
        orderCounts[stat._id] = stat.count;
      }
    });

    // Recent orders
    const recentOrders = await Order.find({ consumer: req.user.id })
      .populate({
        path: 'items.product',
        select: 'name images'
      })
      .sort({ createdAt: -1 })
      .limit(5);

    // Total spent
    const totalSpent = await Order.aggregate([
      {
        $match: {
          consumer: mongoose.Types.ObjectId(req.user.id),
          orderStatus: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    // Farmers purchased from
    const farmersPurchasedFrom = await Order.aggregate([
      {
        $match: {
          consumer: mongoose.Types.ObjectId(req.user.id),
          orderStatus: { $ne: 'cancelled' }
        }
      },
      { $unwind: '$farmers' },
      {
        $group: {
          _id: '$farmers',
          orderCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'farmers',
          localField: '_id',
          foreignField: '_id',
          as: 'farmerDetails'
        }
      },
      { $unwind: '$farmerDetails' },
      {
        $lookup: {
          from: 'users',
          localField: 'farmerDetails.user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          farmName: '$farmerDetails.farmName',
          farmerName: '$userDetails.name',
          orderCount: 1
        }
      },
      { $sort: { orderCount: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        orders: orderCounts,
        recentOrders,
        totalSpent: totalSpent.length > 0 ? totalSpent[0].total : 0,
        farmersPurchasedFrom
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

export { getAdminStats, getFarmerStats, getConsumerStats }