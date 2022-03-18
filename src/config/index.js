require('dotenv').config();

const config = {
  basic: {
    port: process.env.PORT || 3000,
  },
};

module.exports = config;
