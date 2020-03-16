const jwt = require('jsonwebtoken');
const AuthService = require('./service');

function jwtAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    return next();
  });
}

function getAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function getRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  AuthService.addRefreshToken(refreshToken);
  return refreshToken;
}


module.exports = {
  jwtAuth,
  getAccessToken,
  getRefreshToken,
};
