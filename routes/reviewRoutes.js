const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setTourUserIds,
} = reviewController;

router.use(authController.protect);
router
  .route('/')
  .get(getAllReviews)
  .post(authController.restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .patch(authController.restrictTo('user'), updateReview)
  .get(getReview)
  .delete(authController.restrictTo('user'), deleteReview);
module.exports = router;
