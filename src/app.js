const express = require('express');
require('dotenv').config();

const config = require('./config');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api', require('./routes'));

app.use(errorHandler);
app.listen(config.basic.port, () => {
  console.log(`server is running with port ${config.basic.port}`);
});
