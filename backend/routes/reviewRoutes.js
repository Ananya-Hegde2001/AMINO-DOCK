const express = require('express');
const { getReviewsByProduct, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:productId', getReviewsByProduct);
router.post('/', protect, createReview);

module.exports = router;
