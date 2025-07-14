import express from 'express';
import { authenticateAdmin } from '../middlewares/auth.middleware';
import { mintNFTController } from '../controllers/admin.controller';
import multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

// Create uploads directory
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage with proper MIME type handling
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  }
});

// Add file filter for image types
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, JPG, and GIF images are allowed'));
  }
};

// Configure multer with file filter and size limit
const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const router = express.Router();

router.use(authenticateAdmin);
router.post('/mint-nft', upload.single('image'), mintNFTController);

export default router;