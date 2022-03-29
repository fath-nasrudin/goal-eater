const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const config = require('../config');

/**
 * Generate jwt token
 * @param {string} id
 * @returns {string} jwt string
 */
const generateToken = (id) => jwt.sign(
  { id },
  config.jwt.secret,
  {
    expiresIn: '30d',
  },

);

class UserController {
  /**
   * register a user
   * @param {*} req
   * @param {*} res
   * @route POST /api/users/register
   * @access Public
   */
  static async postRegister(req, res) {
    const { name, email, password } = req.body;

    // validation - basic
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }

    // check: is user already register
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('this email already registered');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // try to create user
    const savedUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // check is user saved
    if (!savedUser) {
      res.status(400);
      throw new Error('Bad request');
    }

    res.status(201).json({
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        token: generateToken(savedUser.id),
    });
  }

  /**
   * authenticate a user
   * @param {*} req
   * @param {*} res
   * @route POST /api/users/login
   * @access Public
   */
  static async postLogin(req, res) {
    const { email, password } = req.body;

    // validation - basic
    if (!email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const user = await User.findOne({ email });

    // check is user exist
    if (!user) {
      res.status(404);
      throw new Error('Wrong email or password');
    }

    // if user exist, then check the password
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      res.status(404);
      throw new Error('Wrong email or password');
    }

    // send data to client
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  }

  /**
   * get user basic info
   * @param {*} req
   * @param {*} res
   * @route POST /api/users/me
   * @access Private
   */
  static async getMe(req, res) {
    const { id, name, email } = req.user;

    res.status(200).json({
      user: {
        id,
        name,
        email,
      },
    });
  }
}

module.exports = UserController;
