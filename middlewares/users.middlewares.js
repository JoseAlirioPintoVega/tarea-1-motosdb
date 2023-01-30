const { User } = require('../models/user.model');

exports.verifyUserById = async (req, res, next) => {
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
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
