const { Router } = require('express');
const passport = require('passport');
const AuthComponent = require('../Auth');
const { checkNotAuth } = require('../../config/passport');
/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 *  Login router
 */
router.get('/login', checkNotAuth, AuthComponent.loginPage);

/**
 *  Authenticate router
 */
router.post('/login', checkNotAuth, passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/auth/login',
  failureFlash: true,
}));

/**
 *  Register router
 */
router.get('/register', checkNotAuth, AuthComponent.registerPage);

/**
 *  Register router (new user)
 */
router.post('/register', checkNotAuth, AuthComponent.register);

/**
 * Logout router
 */
router.post('/logout', AuthComponent.logout);

module.exports = router;
