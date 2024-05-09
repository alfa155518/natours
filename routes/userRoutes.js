/* eslint-disable prettier/prettier */
const express = require('express');

const userController = require('../controllers/userController');
const authController = require('.././controllers/authController');

const router = express.Router();

// User Methods Controller
const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = userController;

// User Methods Authentication Controller
const {
  signup,
  login,
  protect,
  restrictTo,
  forgetPassword,
  resetPassword,
  updatePassword,
  logout,
} = authController;
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgetPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect All Routes After This Middleware
router.use(protect);
router.patch('/updatePassword', updatePassword);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.get('/me', getMe, getUser);
router.delete('/deleteMe', deleteMe);

// Restrict All Routes After This Middleware
router.use(restrictTo('admin', 'lead-guide'));

// POST SINGLE USER & GET ALL USER
router.route('/').get(getAllUser).post(createUser);
// GET SINGLE USER & UPDATE TOUR & DELETE USER
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
