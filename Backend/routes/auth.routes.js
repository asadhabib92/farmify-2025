
import express from 'express'
const router = express.Router();
import { register, login, getMe, updateProfile, updatePassword } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { kycVerification } from '../controllers/kyc.controller.js'
import multer from "multer"

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

export default router;
