const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const GoalController = require('../controllers/goal.controller');

router.route('/')
  .get(asyncHandler(GoalController.getGoals))
  .post(asyncHandler(GoalController.setGoal));

router.route('/:id')
  .put(asyncHandler(GoalController.updateGoal))
  .delete(asyncHandler(GoalController.deleteGoal));

module.exports = router;
