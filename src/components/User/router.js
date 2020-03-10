const { Router } = require('express');
const UserComponent = require('../User');

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
router.get('/', UserComponent.findAll);

/**
 *  Login router for JWT authenticate
 */
router.get('/login', UserComponent.findAll);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', UserComponent.findById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {RequestHandler<ParamsDictionary, any, any>} csrfProtection
 * @param {callback} middleware - Express middleware
 */
router.post('/', (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  delete req.body._csrf;
  UserComponent.create(req, res, next);
});

/**
 * Route serving update current user
 * @name /v1/users/update
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {RequestHandler<ParamsDictionary, any, any>} csrfProtection
 * @param {callback} middleware - Express middleware
 */
router.post('/update', (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  delete req.body._csrf;
  UserComponent.updateById(req, res, next);
});

/**
 * Route serving delete current user
 * @name /v1/users/update
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {RequestHandler<ParamsDictionary, any, any>} csrfProtection
 * @param {callback} middleware - Express middleware
 */
router.post('/delete', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  delete req.body._csrf;
  UserComponent.deleteById(req, res);
});

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', UserComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', UserComponent.deleteById);

module.exports = router;
