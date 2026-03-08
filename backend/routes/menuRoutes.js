const express = require('express');
const router = express.Router();
const {
  getAllFoodItems,
  getFoodItem,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFoodByCategory,
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getAllFoodItems)
  .post(protect, authorize('admin'), upload.single('image'), createFoodItem);

router.route('/:id')
  .get(getFoodItem)
  .put(protect, authorize('admin'), upload.single('image'), updateFoodItem)
  .delete(protect, authorize('admin'), deleteFoodItem);

router.get('/category/:category', getFoodByCategory);

module.exports = router;
