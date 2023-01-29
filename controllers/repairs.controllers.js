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
  // buscamos el id en el req.params
  const { id } = req.params;

  // buscamos el Repair por el id obtubimos y validamos el status

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  // validamos la existencia del repair y enviamos el error si no esta
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'That Repair was not found',
    });
  }

  // finalmente enviamos la respuesta al usuario

  res.status(200).json({
    status: 'success',
    message: 'The repair was found',
    repair,
  });
};

exports.createRepairs = async (req, res) => {
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
};

exports.updateRepairs = async (req, res) => {
  try {
    // obtenemos el id del req.params

    const { id } = req.params;

    // buscamos el repair por el id y validamos el status

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    // validamos la existencia del repair y si no esta retornamos un error

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair not found',
        repair,
      });
    }

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
    //primero obtenemos el id del req.params

    const { id } = req.params;

    // luego verificamos el  repair y el status

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    // ahora vamos a verificar si no esta el repair y enviar el error

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'That repair was not found',
      });
    }

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
