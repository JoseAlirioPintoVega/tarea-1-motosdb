const { Router } = require('express');
const {
  getUsers,
  getUsersById,
  createUser,
  updateUsers,
  deleteUsers,
} = require('../controllers/users.controllers');
const { verifyUserById } = require('../middlewares/users.middlewares');

const router = Router();

router.get('/', getUsers);

router.get('/:id', verifyUserById, getUsersById);

router.post('/', createUser);

router.patch('/:id', verifyUserById, updateUsers);

router.delete('/:id', verifyUserById, deleteUsers);

module.exports = {
  usersRouter: router,
};
