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

module.exports = {
  register,
  login,
};
