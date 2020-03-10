const flash = require('connect-flash');
const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

/**
 * Login controller
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function login(req, res, next) {
  try {
    res.status(200).render('auth/login.ejs');
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
}

/**
   * Authenticate controller
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
async function authenticate(req, res, next) {
  try {
    res.status(200).render('auth/login.ejs');
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });
    next(error);
  }
}

/**
 * Register controller
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function register(req, res, next) {
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
 * Register new user
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function createLogin(req, res, next) {
  try {
    const { error } = AuthValidation.create(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    await AuthService.createUser(req.body);

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

module.exports = {
  authenticate,
  login,
  register,
  createLogin,
};
