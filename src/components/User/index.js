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
    const { error } = Joi.schema.validate(req.body);

    // if data not valid
    if (error) {
      res.status(400).json({
        status: `400 ${http.STATUS_CODES[400]}`,
        error: error.details[0].message.replace(/['"]/g, ''),
      });
      throw new Error(error);
    }

    // if data valid
    const newUser = {
      email: req.body.email,
      fullName: req.body.name,
    };
    await UserService.addUser(newUser);
    res.status(200).json({
      status: `200 ${http.STATUS_CODES[200]}`,
    });
  } catch (error) {
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
    const { error } = Joi.schema.validate(req.body);

    // if data not valid
    if (error) {
      res.status(400).json({
        status: `400 ${http.STATUS_CODES[400]}`,
        error: error.details[0].message.replace(/['"]/g, ''),
      });
      throw new Error(error);
    }

    const updatedUser = {
      email: req.body.email,
      newFullName: req.body.name,
    };

    // get update status
    const updStatus = await UserService.updateUser(updatedUser);
    // if db updated
    if (updStatus.nModified > 0) {
      res.status(200).json({
        status: 'updated',
        obj: await UserService.findUser(req.body.email),
      });
    } else { // if db not updated
      res.status(200).json({
        status: 'nothing to update',
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * For delete user in db
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function deleteUser(req, res, next) {
  try {
    // Validation of request data
    const { error } = Joi.deleteSchema.validate(req.body);

    // if data not valid
    if (error) {
      res.status(400).json({
        status: `400 ${http.STATUS_CODES[400]}`,
        error: error.details[0].message.replace(/['"]/g, ''),
      });
      throw new Error(error);
    }

    // get delete status
    const delStatus = await UserService.deleteUser(req.body.email);
    // if user deleted
    if (delStatus.deletedCount > 0) {
      res.status(200).json({
        status: 'deleted',
        details: `delete user with email ${req.body.email}`,
      });
    } else { // if nothing to delete
      res.status(200).json({
        status: 'nothing to delete',
      });
    }
  } catch (error) {
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
