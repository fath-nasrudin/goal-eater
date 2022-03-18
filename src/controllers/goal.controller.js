// const asyncHandler = require('express-async-handler')
class GoalController {
  /**
   * Get goals
   * @param {*} req
   * @param {*} res
   * @route GET /api/goals
   * @access private
   */
  static async getGoals(req, res) {
    res.status(200).json({ message: 'Get goals' });
  }

  /**
   * @desc Set goals
   * @param {*} req
   * @param {*} res
   * @route POST /api/goals
   * @access private
   */
  static async setGoal(req, res) {
    if (!req.body.text) {
      res.status(400);
      throw new Error('please add a text field');
    }
    res.status(200).json({ message: 'Set goals' });
  }

  /**
   * @desc Update goals
   * @param {*} req
   * @param {*} res
   * @route PUT /api/goals/:id
   * @access private
   */
  static async updateGoal(req, res) {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
  }

  /**
   * @desc Delete goals
   * @param {*} req
   * @param {*} res
   * @route DELETE /api/goals/:id
   * @access private
   */
  static async deleteGoal(req, res) {
    res.status(200).json({ message: `Delete goal ${req.params.id}` });
  }
}

module.exports = GoalController;
