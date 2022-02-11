require('express-async-errors');
const bcrypt = require('bcrypt');

const usersRouter = require('express').Router();

const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;
  if (password.length < 3) {
    return response
      .status(401)
      .send({ error: 'password must be at least 3 characters long' });
  }

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  console.log(user);
  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const result = await User.find({}).populate('blogs', {
    user: 0,
  });
  response.json(result);
});

module.exports = usersRouter;
