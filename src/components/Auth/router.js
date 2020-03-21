const { Router } = require('express');
const AuthComponent = require('../Auth');
const { checkNotAuth } = require('../Auth/jwt');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 *  GET Login router
 */
router.get('/login', checkNotAuth, AuthComponent.loginPage);

/**
 *  POST Authenticate router
 */
router.post('/login', AuthComponent.login);

/**
 *  POST Access Token
 */
router.post('/token', AuthComponent.token);

/**
 *  Register router
 */
router.get('/register', AuthComponent.registerPage);

/**
 *  Register router (new user)
 */
router.put('/register', AuthComponent.register);

/**
 * Logout router
 */
router.delete('/logout', AuthComponent.logout);

module.exports = router;
