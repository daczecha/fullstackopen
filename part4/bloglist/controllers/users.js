require('express-async-errors');
const bcrypt = require('bcrypt');

const usersRouter = require('express').Router();

const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const salt = 10;
  const passwordHash = await bcrypt.hash(request.body.passwordHash, salt);

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const result = await User.find({});

  response.json(result);
});

module.exports = usersRouter;
