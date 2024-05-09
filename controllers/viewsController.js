const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const getOverView = catchAsync(async (req, res, next) => {
  // 1) Get Tour Data from collection
  const tours = await Tour.find();
  // 2) Build template

  // 3) Render The Template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});
const getTour = catchAsync(async (req, res, next) => {
  // 1) Get Data from request tour (including reviews and guides)
  const tour = await Tour.findOne({ name: req.params.name }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('No tour found with that name', 404));
  }
  // 3) Render The Template using tour data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
const getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log in to your account',
  });
});
const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};
// const updateUserData = catchAsync(async (req, res, next) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   res.status(201).render('account', {
//     title: 'Your Account',
//     user: updatedUser,
//   });
// });
module.exports = {
  getOverView,
  getTour,
  getLoginForm,
  getAccount,
  // updateUserData,
};
