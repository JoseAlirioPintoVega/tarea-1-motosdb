const { Router } = require('express');
const {
  getRepairs,
  getRepairsById,
  createRepairs,
  updateRepairs,
  deleteRepairs,
} = require('../controllers/repairs.controllers');
const { verifyRepairById } = require('../middlewares/repairs.middlewares');
const { protect, restrictTo } = require('../middlewares/users.middlewares');

const router = Router();

router.use(protect);

router.get('/', restrictTo('employee'), getRepairs);

router.get('/:id', restrictTo('employee'), verifyRepairById, getRepairsById);

router.post('/', createRepairs);

router.patch('/:id', restrictTo('employee'), verifyRepairById, updateRepairs);

router.delete('/:id', restrictTo('employee'), verifyRepairById, deleteRepairs);

module.exports = {
  repairsRouter: router,
};
