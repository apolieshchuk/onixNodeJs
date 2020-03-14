const LoginUsersModel = require('./model');

/**
 * Register new User
 *
 * @exports
 * @method register
 * @param {name, login, password} new user
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function register(newUser) {
  return LoginUsersModel.create(newUser);
}

/**
 * Authenticate user
 *
 * @exports
 * @method login
 * @param {name, login, password} new user
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function login(user) {
  return LoginUsersModel.find({ login: user.login, password: user.password });
}

/**
 * Find user by login
 *
 * @exports
 * @method Find user by login
 * @param {String} login name
 * @summary Find user by login
 * @returns {Promise<UserModel>}
 */
function findUserByLogin(userLogin) {
  return LoginUsersModel.findOne({ login: userLogin });
}

/**
 * Find user by id
 *
 * @exports
 * @method Find user by id
 * @param {String} login id
 * @summary Find user by id
 * @returns {Promise<UserModel>}
 */
function findUserById(id) {
  return LoginUsersModel.findOne({ _id: id });
}

module.exports = {
  register,
  login,
  findUserByLogin,
  findUserById,
};
