const { User } = require('../models/user.model');

exports.getUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.getUsersById = async (req, res) => {
  try {
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
    //enviamos la respuesta al usuario
    console.log(req.query);
    res.json({
      status: 'success',
      message: 'User was found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createUser = async (req, res) => {
  // obtenemos la información del req.body
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server error',
    });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    // primero obtenemos el id por el req.params
    const { id } = req.params;
    // obtenemos la informacion que vamos a actualizar del req.body

    const { name, email } = req.body;

    //obtemos el usuario por el id que ya recivimos y validamos el status

    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
