// https://www.natours.dev/api/v1/tours
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static Fils
app.use(express.static(path.join(__dirname, 'public')));
// Security HTTP headers
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
// Limit requests from same API
app.use('/api', limiter);
app.use(morgan('dev'));
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Serving static files
// app.use(express.static(`${__dirname}/public`));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });
// viewRouter MIDDLEWARE pug file
app.use('/', viewRouter);

// TOUR MIDDLEWARE
app.use('/api/v1/tours', tourRouter);

// USER MIDDLEWARE
app.use('/api/v1/users', userRouter);

// REVIEWS MIDDLEWARE
app.use('/api/v1/reviews', reviewRouter);

// Route Not Found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
