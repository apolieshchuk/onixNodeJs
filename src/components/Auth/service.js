const LoginUsersModel = require('./model');

/**
 * @exports
 * @method create
 * @param {name, login, password} new user
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function createUser(newUser) {
  return LoginUsersModel.create(newUser);
}

module.exports = {
  createUser,
};
