const Gallery = require('../models/Gallery');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
exports.getAllImages = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const images = await Gallery.find(filter).sort({ uploadedAt: -1 });

    res.status(200).json({
      success: true,
      count: images.length,
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Upload gallery image
// @route   POST /api/gallery
// @access  Private/Admin
exports.uploadImage = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;

    // If file is uploaded, upload to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'restaurant/gallery',
            transformation: [
              { width: 1200, height: 900, crop: 'limit' },
              { quality: 'auto' },
              { fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      imageUrl = result.secure_url;
    }

    const { title, category } = req.body;

    const image = await Gallery.create({
      imageUrl,
      title,
      category,
    });

    res.status(201).json({
      success: true,
      image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
