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

//models
const User = require('./models/user');
const Blog = require('./models/blog');

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

app.use(middleware.getToken);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.get('/clear', async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  res.send('cleared');
});

module.exports = app;
