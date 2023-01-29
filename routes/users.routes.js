const { Router } = require('express');
const {
  getUsers,
  getUsersById,
  createUser,
  updateUsers,
  deleteUsers,
} = require('../controllers/users.controllers');

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.post('/', createUser);

router.patch('/:id', updateUsers);

router.delete('/:id', deleteUsers);

module.exports = {
  usersRouter: router,
};
