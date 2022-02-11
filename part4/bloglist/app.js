//libraries
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//utils
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

//controllers
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

logger.info(`connecting to ${config.MONGO_URI}`);

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) =>
    logger.error('error connecting to MongoDB:', error.message)
  );

app.use(cors());
app.use(middleware.morgan);
app.use(bodyParser.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
