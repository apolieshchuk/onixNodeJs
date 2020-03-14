const { Router } = require('express');
const UserComponent = require('../User');
const { checkAuth } = require('../../config/passport');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {RequestHandler<ParamsDictionary, any, any>} csrfProtection
 * @param {callback} middleware - Express middleware.
 */
router.get('/', checkAuth, UserComponent.findAll);


/**
 * Route serving a user
 * @name /users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', UserComponent.findById);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {RequestHandler<ParamsDictionary, any, any>} csrfProtection
 * @param {callback} middleware - Express middleware
 */
router.post('/', UserComponent.create);

/**
 * Route serving update current user
 * @name /users/update
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {RequestHandler<ParamsDictionary, any, any>} csrfProtection
 * @param {callback} middleware - Express middleware
 */
router.post('/update', UserComponent.updateById);

/**
 * Route serving delete current user
 * @name /users/update
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {RequestHandler<ParamsDictionary, any, any>} csrfProtection
 * @param {callback} middleware - Express middleware
 */
router.post('/delete', UserComponent.deleteById);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', UserComponent.updateById);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', UserComponent.deleteById);

module.exports = router;
