// routes/uploadRoutes.js
import path from 'path';
import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), '/uploads'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post('/', protect, upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    image: `/uploads/${req.file.filename}`,
  });
});

export default router;
