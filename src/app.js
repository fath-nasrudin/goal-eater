const express = require('express');
require('dotenv').config();
const cors = require('cors')

const config = require('./config');
const { errorHandler } = require('./middlewares/error.middleware');
const connectDB = require('./config/db');

// try to making connection to database
connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({origin:'*'}))
// routes
app.use('/api', require('./routes'));

app.use(errorHandler);
app.listen(config.basic.port, () => {
  console.log(`server is running with port ${config.basic.port}`);
});
