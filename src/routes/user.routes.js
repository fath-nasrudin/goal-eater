const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middlewares/auth.middleware');
const UserController = require('../controllers/user.controller');

router.route('/register')
  .post(asyncHandler(UserController.postRegister));

router.route('/login')
  .post(asyncHandler(UserController.postLogin));

router.route('/me')
  .get(protect, asyncHandler(UserController.getMe));

module.exports = router;
