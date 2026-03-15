const Review = require('../models/Review');

const getReviewsByProduct = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId, approved: true })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  const averageRating = reviews.length
    ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
    : 0;

  res.json({ reviews, averageRating: Number(averageRating.toFixed(1)) });
};

const createReview = async (req, res) => {
  const { product, rating, comment } = req.body;

  const review = await Review.create({
    product,
    rating,
    comment,
    user: req.user._id
  });

  res.status(201).json(review);
};

module.exports = { getReviewsByProduct, createReview };
