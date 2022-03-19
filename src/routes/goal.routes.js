const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const GoalController = require('../controllers/goal.controller');
const { protect } = require('../middlewares/auth.middleware');

router.route('/')
  .get(protect, asyncHandler(GoalController.getGoals))
  .post(protect, asyncHandler(GoalController.setGoal));

router.route('/:id')
  .put(protect, asyncHandler(GoalController.updateGoal))
  .delete(protect, asyncHandler(GoalController.deleteGoal));

module.exports = router;
