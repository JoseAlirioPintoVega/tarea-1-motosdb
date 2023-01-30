const Repair = require('../models/repair.models');

exports.getRepairs = async (req, res) => {
  try {
    // aca buscamos todas las repairs
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });
    // enviamos la respuesta al usuario
    res.status(200).json({
      status: 'success',
      message: 'Repairs was found sucessfully',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.getRepairsById = async (req, res) => {
  try {
    // buscamos el repair en el req
    const { repair } = req;

    // finalmente enviamos la respuesta al usuario

    res.status(200).json({
      status: 'success',
      message: 'The repair was found',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createRepairs = async (req, res) => {
  try {
    // obtenemos la informacion del req.body

    const { date, userId } = req.body;

    // creamos el usuario

    const newRepair = await Repair.create({
      date,
      userId,
    });

    //enviamos la respuesta al usuario

    res.status(201).json({
      status: 'success',
      message: 'ROUTE - POST',
      newRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updateRepairs = async (req, res) => {
  try {
    // buscamos el repair en el req
    const { repair } = req;
    // si todo esta correcto realizamos la actualización del estado

    const updatedRepair = await repair.update({ status: 'complete' });

    // finalmente enviamos la respuesta al usuario
    res.status(200).json({
      status: 'success',
      message: 'ROUTE - PATCH',
      updatedRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deleteRepairs = async (req, res) => {
  try {
    // buscamos el repair en el req
    const { repair } = req;

    // si todo esta bien realizamos el cambio en el estado

    await repair.update({ status: 'cancelled' });

    // finalmente enviamos la respuesta al cliente

    res.status(200).json({
      status: 'success',
      message: 'That repair was delete',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
