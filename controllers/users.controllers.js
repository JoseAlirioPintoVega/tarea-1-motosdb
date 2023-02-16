const { User } = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const AppError = require('../../01-restserver/utils/appError');
const generateJWT = require('../utils/jwt');
const Repair = require('../models/repair.models');

exports.getUsers = catchAsync(async (req, res, next) => {
  //aca buscamos todos los usuarios
  const users = await User.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
    where: {
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

  // enviamos la respuesta al usuario
  res.status(200).json({
    status: 'success',
    message: 'Users ware found successfully',
    users,
  });
});
exports.getUsersById = catchAsync(async (req, res, next) => {
  // buscamos el user  en req
  const { user } = req;

  //enviamos la respuesta al usuario
  console.log(req.query);
  res.json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  // obtenemos la información del req.body

  const { name, email, password, role = 'user' } = req.body;

  const user = new User({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'User was created sucessfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.updateUsers = catchAsync(async (req, res, next) => {
  // buscamos el user  en req
  const { user } = req;

  const { name, email } = req.body;

  // validamos la existencia del usuario y si no existe enviamos el error
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  // si todo esta  correcto realizamos la  actualización
  const updatedUser = await user.update({
    name,
    email,
  });

  // finalmente enviamos la respuesta al usuario
  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    updatedUser,
  });
});

exports.deleteUsers = catchAsync(async (req, res, next) => {
  // primero obtenemos el id en el req.params
  const { id } = req.params;

  // luego buscamos el usuario a eliminar con el id y validamos el status
  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });
  // si el producto no esta enviamos el error
  if (!user) {
    return res.status(404).json({
      status: 'error',
      menssage: 'User was not found',
    });
  }
  // ahora realizamos la  actualizaciondel estado "eliminar"
  await user.update({ status: cancel });
  // finalmente enviamos la respuesta al usuario

  res.status(200).json({
    status: 'success',
    message: 'User was deleted',
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });
  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }
  console.log(password, user.password);
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email of password', 401));
  }
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
