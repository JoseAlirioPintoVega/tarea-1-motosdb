const { Router } = require('express');
const {
  getRepairs,
  getRepairsById,
  createRepairs,
  updateRepairs,
  deleteRepairs,
} = require('../controllers/repairs.controllers');

const router = Router();

router.get('/', getRepairs);

router.get('/:id', getRepairsById);

router.post('/', createRepairs);

router.patch('/:id', updateRepairs);

router.delete('/:id', deleteRepairs);

module.exports = {
  repairsRouter: router,
};
