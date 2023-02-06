const { User } = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.verifyUserById = catchAsync(async (req, res, next) => {
  // buscamos el id en req.params
  const { id } = req.params;
  //buscamos el usuario por el id que obtenemos en los params y validamos el status

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
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
