const { User } = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res) => {
  //aca buscamos todos los usuarios
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  // enviamos la respuesta al usuario
  res.status(200).json({
    status: 'success',
    message: 'Users ware found successfully',
    users,
  });
});
exports.getUsersById = catchAsync(async (req, res) => {
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

exports.createUser = catchAsync(async (req, res) => {
  // obtenemos la información del req.body

  const { name, email, password } = req.body;

  console.log(name, email, password);
  //creamos el usuario

  const newUser = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });
  // enviamos la respuesta al usuario

  res.status(201).json({
    status: 'success',
    message: 'User was created sucessfully',
    newUser,
  });
});

exports.updateUsers = catchAsync(async (req, res) => {
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

exports.deleteUsers = catchAsync(async (req, res) => {
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
  await user.update({ status: false });
  // finalmente enviamos la respuesta al usuario

  res.status(200).json({
    status: 'success',
    message: 'User was deleted',
  });
});
