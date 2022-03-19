const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please fill the name field'],
  },
  email: {
    type: String,
    required: [true, 'please fill the email field'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please fill the password field'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
