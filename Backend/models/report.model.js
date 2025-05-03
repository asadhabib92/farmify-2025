
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a report title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a report description']
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportedEntity: {
    entityType: {
      type: String,
      enum: ['user', 'farmer', 'product', 'order', 'payment'],
      required: true
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'reportedEntity.entityType'
    }
  },
  reportedEntityName: {
    type: String
  },
  type: {
    type: String,
    enum: ['Product', 'Service', 'Payment', 'User', 'Other'],
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolution: {
    text: String,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date
  },
  attachments: [{
    type: String
  }],
  comments: [{
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', ReportSchema);
