
const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, updatePassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { kycVerification } = require('../controllers/kyc.controller');
const multer = require("multer")

// image storage engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post('/kyc', upload.single("image"), kycVerification);

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updateprofile', protect, updateProfile);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
