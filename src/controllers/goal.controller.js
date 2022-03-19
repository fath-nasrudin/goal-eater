const Goal = require('../models/goal.model');

class GoalController {
  /**
   * Get goals
   * @param {*} req
   * @param {*} res
   * @route GET /api/goals
   * @access private
   */
  static async getGoals(req, res) {
    const goals = await Goal.find().where({ user: req.user.id });

    res.status(200).json({ goals });
  }

  /**
   * @desc Set goals
   * @param {*} req
   * @param {*} res
   * @route POST /api/goals
   * @access private
   */
  static async setGoal(req, res) {
    const { text } = req.body;
    if (!text) {
      res.status(400);
      throw new Error('please add a text field');
    }

    const goal = await Goal.create({
      text,
      user: req.user.id,
    });

    res.status(200).json({ goal });
  }

  /**
   * @desc Update goals
   * @param {*} req
   * @param {*} res
   * @route PUT /api/goals/:id
   * @access private
   */
  static async updateGoal(req, res) {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      res.status(400);
      throw new Error('please add a text field');
    }

    const goal = await Goal.findById(id);

    // if there's not found the goal
    if (!goal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    // make sure goal.user is matched with req.user.id
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, { text });

    // send data to user
    res.status(200).json({
      status: 'updated',
      goal: updatedGoal,
    });
  }

  /**
   * @desc Delete goals
   * @param {*} req
   * @param {*} res
   * @route DELETE /api/goals/:id
   * @access private
   */
  static async deleteGoal(req, res) {
    const { id } = req.params;
    const goal = await Goal.findById(id);

    // check is goal found
    if (!goal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    // make sure goal.user is matched with req.user.id
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized');
    }

    const deletedGoal = await Goal.findByIdAndDelete(id);

    if (!deletedGoal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    res.status(200).json({
      message: 'success deleted Goal',
      id,
    });
  }
}

module.exports = GoalController;
