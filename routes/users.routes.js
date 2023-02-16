const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUsers,
  getUsersById,
  createUser,
  updateUsers,
  deleteUsers,
  loginUser,
} = require('../controllers/users.controllers');
const {
  verifyUserById,
  validIfExistUserEmail,
  protect,
  protectAccoutOwner,
} = require('../middlewares/users.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email has been a corret format').isEmail(),
    check(
      'password',
      'The password need min 8 caracters and max 10 caracters'
    ).isLength({
      min: 8,
      max: 10,
    }),
  ],
  validateFields,
  validIfExistUserEmail,
  createUser
);

router.post(
  '/login',
  [
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email has been a corret format').isEmail(),
    check(
      'password',
      'The password need min 8 caracters and max 10 caracters'
    ).isLength({
      min: 8,
      max: 10,
    }),
  ],
  loginUser
);

router.use(protect);

router.get('/', getUsers);

router.get('/:id', verifyUserById, getUsersById);

router.patch('/:id', verifyUserById, protectAccoutOwner, updateUsers);

router.delete('/:id', verifyUserById, protectAccoutOwner, deleteUsers);

module.exports = {
  usersRouter: router,
};
