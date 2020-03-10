const { Router } = require('express');
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
router.get('/login', AuthComponent.login);

/**
 *  Authenticate router
 */
router.post('/login', AuthComponent.authenticate);

/**
 *  Register router
 */
router.get('/register', AuthComponent.register);

/**
 *  Register router (new user)
 */
router.post('/register', AuthComponent.createLogin);

module.exports = router;
