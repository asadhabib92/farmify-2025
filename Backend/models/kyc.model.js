const mongoose = require("mongoose")

const kycSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    aadhaar: {
        type: String,
        required: true
    },
    pan: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    farmName: {
        type: String,
        required: true
    },
    farmSize: {
        type: String,
        required: true
    },
    farmAddress: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    primaryProducts: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    aadhaarImage: {
        type: String,
        required: true
    },
    panImage: {
        type: String,
        required: true
    },
    farmOwnershipimage: {
        type: String,
        required: true
    },

});

const kycModel = mongoose.model('KYC Details', kycSchema);

module.exports = kycModel;