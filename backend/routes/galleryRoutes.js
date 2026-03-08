const express = require('express');
const router = express.Router();
const {
  getAllImages,
  uploadImage,
  deleteImage,
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getAllImages)
  .post(protect, authorize('admin'), upload.single('image'), uploadImage);

router.delete('/:id', protect, authorize('admin'), deleteImage);

module.exports = router;
