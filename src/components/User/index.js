const UserService = require('./service');

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
    const newUser = {
      email: req.body.email,
      fullName: req.body.name,
    };

    await UserService.addUser(newUser);
    res.status(200).end();
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
    const updatedUser = {
      email: req.body.email,
      newFullName: req.body.name,
    };

    await UserService.updateUser(updatedUser);
    res.status(200).end();
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
    await UserService.deleteUser(req.body.email);
    res.status(200).end();
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
