const Review = require('../models/reviewsModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

const setTourUserIds = (req, res, next) => {
  // Allow Nested Routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
const createReview = factory.createOne(Review);
const getAllReviews = factory.getAll(Review);
const getReview = factory.getOne(Review);
const updateReview = factory.updateOne(Review);
const deleteReview = factory.deleteOne(Review);

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  setTourUserIds,
};
