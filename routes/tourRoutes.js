const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('.././routes/reviewRoutes');
const { protect, restrictTo } = authController;
const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = tourController;

router.route('/tour-stats').get(protect, getTourStats);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

// POST SINGLE TOUR & GET ALL TOURS
router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

// GET SINGLE TOUR & UPDATE TOUR & DELETE TOUR
router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
