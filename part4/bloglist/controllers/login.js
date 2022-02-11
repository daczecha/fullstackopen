const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', (request, response) => {
  const { username, password } = request.body;
  if (!username) return response.status(401).json({ error: 'enter username' });
  if (!password) return response.status(401).json({ error: 'enter password' });

  const user = User.findOne({ username });

  const isPasswordCorrect =
    user === null ? false : bcrypt.compare(password, user.passwordHash);
  if (!(user && isPasswordCorrect))
    return response
      .status(401)
      .json({ error: 'username or password is invalid' });

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
