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

module.exports = {
  findAll,
  addUser,
};
