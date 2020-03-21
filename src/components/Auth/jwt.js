const jwt = require('jsonwebtoken');
const AuthService = require('./service');

function isExpired(token) {
  const { exp } = jwt.decode(token);
  return Date.now() >= exp * 1000;
}

function getAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  });
}

function getRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXP,
  });
  AuthService.addRefreshToken(user.email, refreshToken);
  return refreshToken;
}

function getTokens(user) {
  return {
    accessToken: getAccessToken(user),
    refreshToken: getRefreshToken(user),
  };
}

function updateTokens(req) {
  // Check refresh token exists in cookies
  const { refreshToken } = req.cookies;
  if (!refreshToken) return false;

  // Check refresh token exists in database of tokens
  const isExists = AuthService.refreshTokenExists(refreshToken);
  if (!isExists) return false;

  // Check refresh token expired and correctness
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return false;
    }
    const tokens = getTokens({ email: user.email, name: user.name });
    // change request auth info
    req.cookies.accessToken = tokens.accessToken;
    req.cookies.refreshToken = tokens.refreshToken;
    return true;
  });
}

/** If user access token valid - go next()
 *  else - redirect to login page
 */
function checkAuth(req, res, next) {
  // check auth info and access token exists
  const { accessToken } = req.cookies;
  if (!accessToken) return res.redirect(302, '/auth/login');

  // update expired tokens if we can
  if (isExpired(accessToken)) {
    if (!updateTokens(req)) {
      return res.redirect(302, '/auth/login');
    }
  }

  // check Access token validation
  return jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.redirect(302, '/auth/login');
    } else {
      req.user = user;
      next();
    }
  });
}

/**
 * Redirect routes on page users, if user already login
 */
function checkNotAuth(req, res, next) {
  // check auth info and access token exists
  const { accessToken } = req.cookies;
  if (!accessToken) return next();

  // Check access token exists or expired
  if (isExpired(accessToken)) {
    if (updateTokens(req)) {
      return res.redirect(302, '/users');
    }
    return next();
  }

  // check Access token validation
  return jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.redirect(302, '/auth/login');
    } else {
      req.user = user;
      next();
    }
  });
}

module.exports = {
  checkAuth,
  checkNotAuth,
  getTokens,
};
