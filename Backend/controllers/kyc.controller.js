const kycModel = require("../models/kyc.model")

exports.kycVerification = async (req, res) => {
    console.log(req.body);
    let aadhaarImage = `${req.file.aadhaarImage}`
    let panImage = `${req.file.panImage}`
    let farmOwnershipImage = `${req.file.farmOwnershipImage}`

    const kyc = new kycModel({
        userId: req.body.userId,
        fullName: req.body.fullName,
        dob: req.body.dob,
        aadhaar: req.body.aadhaar,
        pan: req.body.pan,
        address: req.body.address,
        state: req.body.state,
        district: req.body.district,
        pin: req.body.pin,
        farmName: req.body.farmName,
        farmSize: req.body.farmSize,
        farmAddress: req.body.farmAddress,
        type: req.body.type,
        primaryProducts: req.body.primaryProducts,
        experience: req.body.experience,
        aadhaarImage: aadhaarImage,
        panImage: panImage,
        farmOwnershipimage: farmOwnershipImage,
    });
    try {
        await kyc.save();
        res.json({ success: true, message: "Application Submitted Successfully" })
    } catch (error) {
        console.log("error is " + error);
        res.json({ success: false, message: "Error" })
    }
}
