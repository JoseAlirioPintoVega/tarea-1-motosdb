const Repair = require('../models/repair.models');

exports.verifyRepairById = async (req, res, next) => {
  try {
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
    req.repair = repair;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
