const { Router } = require('express');
const AuthComponent = require('../Auth');


/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 *  GET Login router
 */
router.get('/login', AuthComponent.loginPage);

/**
 *  POST Authenticate router
 */
router.post('/login', AuthComponent.login);

/**
 *  POST Access Token
 */
router.post('/token', AuthComponent.getToken);

/**
 *  Register router
 */
router.get('/register', AuthComponent.registerPage);

/**
 *  Register router (new user)
 */
router.post('/register', AuthComponent.register);

/**
 * Logout router
 */
router.delete('/logout', AuthComponent.logout);

module.exports = router;
