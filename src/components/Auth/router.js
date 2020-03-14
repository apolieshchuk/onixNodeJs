const { Router } = require('express');
const passport = require('passport');
const AuthComponent = require('../Auth');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 *  Login router
 */
router.get('/login', AuthComponent.loginPage);

/**
 *  Authenticate router
 */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/auth/login',
  failureFlash: true,
}));

/**
 *  Register router
 */
router.get('/register', AuthComponent.registerPage);

/**
 *  Register router (new user)
 */
router.post('/register', AuthComponent.register);

module.exports = router;