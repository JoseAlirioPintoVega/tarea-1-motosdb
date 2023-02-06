const AppError = require('../../01-restserver/utils/appError');

const hanleCastError22P02 = err => {
  message = 'Some type of data sent does not match was expected';
  return new AppError(message, 400);
};
const sendErrorDev = (err, res) => {
  res.status(res.statusCode).json({
    status: err.status,
    error: err,
    message: err.stack,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(res.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR DI');
    res.status(res.statusCode).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    const error = { ...err };
    sendErrorProd(error, res);
  }
};
module.exports = globalErrorHandler;
