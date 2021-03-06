require('dotenv').config();

const config = {
  basic: {
    port: process.env.PORT || 3030,
  },
  db: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

module.exports = config;
