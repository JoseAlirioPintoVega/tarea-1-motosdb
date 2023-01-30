const { Router } = require('express');
const {
  getRepairs,
  getRepairsById,
  createRepairs,
  updateRepairs,
  deleteRepairs,
} = require('../controllers/repairs.controllers');
const { verifyRepairById } = require('../middlewares/repairs.middlewares');

const router = Router();

router.get('/', getRepairs);

router.get('/:id', verifyRepairById, getRepairsById);

router.post('/', createRepairs);

router.patch('/:id', verifyRepairById, updateRepairs);

router.delete('/:id', verifyRepairById, deleteRepairs);

module.exports = {
  repairsRouter: router,
};
