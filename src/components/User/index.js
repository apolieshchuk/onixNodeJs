const http = require('http');
const UserService = require('./service');
const Joi = require('./validation');

/**
 * For get all users list from db
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
  try {
    const users = await UserService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.send(error.message);
    next(error);
  }
}

/**
 * For add new user in db
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function addUser(req, res, next) {
  try {
    // Validation of request data
    const { error } = Joi.addSchema.validate(req.body);

    // if data not valid
    if (error) throw error;

    // if data valid
    const newUser = {
      email: req.body.email,
      fullName: req.body.name,
    };

    // create new user
    res.status(200).json({
      status: `200 ${http.STATUS_CODES[200]}`,
      user: await UserService.addUser(newUser),
    });
  } catch (error) {
    if (error.name === 'ValidationError') res.status(400);
    res.send(`${error.name}.${error.message}`);
    next(error);
  }
}

/**
 * Find user in db
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findUser(req, res, next) {
  try {
    const user = await UserService.findUser(req.body.email);
    res.status(200).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(400);
    res.send(`${error.name}.${error.message}`);
    next(error);
  }
}

/**
 * For update user in db
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function updateUser(req, res, next) {
  try {
    // Validation of request data
    const { error } = Joi.updSchema.validate(req.body);

    // if data not valid
    if (error) throw error;

    // if data valid
    const user = await UserService.updateUser(req.body);
    if (user) {
      res.status(200).json({
        status: 'updated',
        obj: user,
      });
    } else { // if db not updated
      res.status(400).json({
        status: `user ID: ${req.body.id} not found`,
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') res.status(400);
    res.send(`${error.name}.${error.message}`);
    next(error);
  }
}

/**
 * Delete user in db by user_id
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function deleteUser(req, res, next) {
  try {
    // Validation of request data
    const { error } = Joi.delSchema.validate(req.body);

    // if data not valid
    if (error) throw error;

    // get delete status
    const delStatus = await UserService.deleteUser(req.body.id);
    // if user deleted
    if (delStatus.deletedCount > 0) {
      res.status(200).json({
        status: 'deleted',
        details: `delete user with id ${req.body.id}`,
      });
    } else { // if nothing to delete
      res.status(200).json({
        status: 'nothing to delete',
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') res.status(400);
    res.send(`${error.name}.${error.message}`);
    next(error);
  }
}

module.exports = {
  findAll,
  addUser,
  findUser,
  updateUser,
  deleteUser,
};
