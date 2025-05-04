
import multer from 'multer'
import path from 'path'

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Choose destination based on file type
    let dest = 'uploads/';

    if (file.fieldname === 'profileImage') {
      dest += 'profiles/';
    } else if (file.fieldname === 'productImages') {
      dest += 'products/';
    } else if (file.fieldname === 'farmPhotos') {
      dest += 'farms/';
    } else if (file.fieldname === 'kycDocuments') {
      dest += 'kyc/';
    } else if (file.fieldname === 'reviewImages') {
      dest += 'reviews/';
    } else {
      dest += 'misc/';
    }

    cb(null, path.join(__dirname, '../', dest));
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images and PDFs only
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Please upload images or PDF files only.'), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

export { upload }
