const Food = require('../models/Food');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getAllFoodItems = async (req, res) => {
  try {
    const { category, availability } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (availability !== undefined) {
      filter.availability = availability === 'true';
    }

    const foodItems = await Food.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foodItems.length,
      foodItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single food item
// @route   GET /api/menu/:id
// @access  Public
exports.getFoodItem = async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found',
      });
    }

    res.status(200).json({
      success: true,
      foodItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create food item
// @route   POST /api/menu
// @access  Private/Admin
exports.createFoodItem = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;

    // If file is uploaded, upload to Cloudinary
    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'restaurant/menu',
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) throw error;
        }
      );

      await new Promise((resolve, reject) => {
        uploadStream.on('finish', () => resolve());
        uploadStream.on('error', reject);
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      // Wait for the upload to complete and get the URL
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'restaurant/menu',
            transformation: [
              { width: 800, height: 600, crop: 'limit' },
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

    const foodItem = await Food.create({
      ...req.body,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      foodItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update food item
// @route   PUT /api/menu/:id
// @access  Private/Admin
exports.updateFoodItem = async (req, res) => {
  try {
    let foodItem = await Food.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found',
      });
    }

    let updateData = { ...req.body };

    // If new file is uploaded, upload to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'restaurant/menu',
            transformation: [
              { width: 800, height: 600, crop: 'limit' },
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

      updateData.imageUrl = result.secure_url;
    }

    foodItem = await Food.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      foodItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete food item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
exports.deleteFoodItem = async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found',
      });
    }

    await foodItem.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Food item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get menu by category
// @route   GET /api/menu/category/:category
// @access  Public
exports.getFoodByCategory = async (req, res) => {
  try {
    const foodItems = await Food.find({ 
      category: req.params.category,
      availability: true 
    });

    res.status(200).json({
      success: true,
      count: foodItems.length,
      foodItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
