const AppError = require('../../01-restserver/utils/appError');
const { User } = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Repair = require('../models/repair.models');

exports.verifyUserById = catchAsync(async (req, res, next) => {
  // buscamos el id en req.params
  const { id } = req.params;
  //buscamos el usuario por el id que obtenemos en los params y validamos el status

  const user = await User.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
    where: {
      id,
      status: 'available',
    },
    include: [
      {
        model: Repair,
        attributes: ['id', 'date', 'status', 'userId'],
        where: { status: 'pending' },
      },
    ],
  });
  // validamos la existencia del usuario y si no existe  enviamos el error
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }
  req.user = user;
  next();
});

exports.validIfExistUserEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (user && !user.status) {
    //TODO: lo que se deberia hacer es hacerle un update a true al estado de la cuenta
    return res.status(400).json({
      status: 'error',
      message:
        'El usuario tiene una cuenta, pero esta desactivida por favor hable con el administrador para activarla',
    });
  }

  if (user) {
    return res.status(400).json({
      status: 'error',
      message: 'The email user already exists',
    });
  }

  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged! Please log in to get access', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });
  if (!user) {
    return next(
      new AppError('the owner of this token in not longer avaible', 401)
    );
  }
  // if (user.passwordChangedAt) {
  //   const changedTimeStamp = parseInt(
  //     user.passwordChangedAt.getTime() / 1000,
  //     10
  //   );
  //   if (decoded.iat < changedTimeStamp) {
  //     return next(
  //       new AppError('User recently changed password, please login again', 401)
  //     );
  //   }
  // }
  req.sessionUser = user;
  next();
});

exports.protectAccoutOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;
  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401));
  }
  next();
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perform this action')
      );
    }
    next();
  };
};
