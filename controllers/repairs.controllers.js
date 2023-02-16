const Repair = require('../models/repair.models');
const catchAsync = require('../utils/catchAsync');

exports.getRepairs = catchAsync(async (req, res) => {
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
});

exports.getRepairsById = catchAsync(async (req, res) => {
  // buscamos el repair en el req
  const { repair } = req;

  // finalmente enviamos la respuesta al usuario

  res.status(200).json({
    status: 'success',
    message: 'The repair was found',
    repair,
  });
});

exports.createRepairs = catchAsync(async (req, res) => {
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
});
exports.updateRepairs = catchAsync(async (req, res) => {
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
});

exports.deleteRepairs = catchAsync(async (req, res) => {
  // buscamos el repair en el req
  const { repair } = req;

  // si todo esta bien realizamos el cambio en el estado

  await repair.update({ status: 'cancelled' });

  // finalmente enviamos la respuesta al cliente

  res.status(200).json({
    status: 'success',
    message: 'That repair was delete',
  });
});
