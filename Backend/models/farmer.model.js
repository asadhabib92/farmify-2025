
const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmName: {
    type: String,
    required: [true, 'Please add a farm name'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  farmLocation: {
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  farmSize: {
    type: Number,
    default: 0
  },
  farmingSince: {
    type: Date
  },
  farmingTypes: [{
    type: String,
    enum: ['organic', 'conventional', 'hydroponic', 'aquaponic', 'other']
  }],
  farmPhotos: [{
    type: String
  }],
  certifications: [{
    name: String,
    issueDate: Date,
    expiryDate: Date,
    certificateImage: String
  }],
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },
  upiId: String,
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Farmer', FarmerSchema);
