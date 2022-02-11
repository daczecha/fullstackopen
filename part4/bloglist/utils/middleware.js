const morgan = require('morgan');

//Get token
const getToken = (request, response, next) => {
  const authorization = request.headers.authorization;

  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    request.token = authorization.substring(7);
  else request.token = null;
  next();
};

module.exports = { morgan: morgan('tiny'), getToken };
