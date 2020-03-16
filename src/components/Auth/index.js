const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAccessToken, getRefreshToken } = require('./jwt');
const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');


/**
 * GET Login controller
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function loginPage(req, res, next) {
  try {
    res.status(200).render('auth/login.ejs', {
      csrfToken: req.csrfToken(),
      error: req.flash('error'),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
}

/**
 * POST Login controller
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function login(req, res, next) {
  try {
    const { email } = req.body;
    const user = await AuthService.findUserByEmail(email);
    const accessToken = getAccessToken({ email: user.email, name: user.name });
    const refreshToken = getRefreshToken({ email: user.email, name: user.name });
    res.status(200);
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
}

/**
 * Getting new access token
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function getToken(req, res, next) {
  const refreshToken = req.body.token;
  const isExists = await AuthService.refreshTokenExists(refreshToken);
  if (isExists == null) {
    return res.sendStatus(401);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = getAccessToken({ email: user.email, name: user.name });
    return res.json({ accessToken });
  });
  return next();
}

/**
 * GET Register controller
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function registerPage(req, res, next) {
  try {
    res.status(200).render('auth/register.ejs', {
      csrfToken: req.csrfToken(),
      error: req.flash('error'),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
}

/**
 * POST Register new user
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function register(req, res, next) {
  try {
    const { error } = AuthValidation.register(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    // do password hashing
    req.body.password = await bcrypt.hash(req.body.password, 10);

    await AuthService.register(req.body);

    res.redirect(302, '/auth/login');
  } catch (error) {
    if (error instanceof ValidationError) {
      const errArray = error.message.map((el) => el.message);
      req.flash('error', errArray);
      res.redirect(302, '/auth/register');
    } else if (error.name === 'MongoError') {
      req.flash('error', [error.errmsg]);
      res.redirect(302, '/auth/register');
    } else {
      res.status(500).json({
        error: error.message,
        details: null,
      });
    }
    next(error);
  }
}

/**
 * Logout user (delete refresh token)
 * DELETE method
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function logout(req, res, next) {
  try {
    await AuthService.delRefreshToken(req.body.token);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
}

module.exports = {
  loginPage,
  registerPage,
  register,
  logout,
  login,
  getToken,
};
