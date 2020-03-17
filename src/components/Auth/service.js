const { LoginUsersModel, RefreshTokensModel } = require('./model');

/**
 * Register new User
 *
 * @exports
 * @method register
 * @param {name, login, password} newUser
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
 * @param {name, login, password} user
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
 * @method Find user by email
 * @param {String} userEmail
 * @summary Find user by email
 * @returns {Promise<UserModel>}
 */
function findUserByEmail(email) {
  return LoginUsersModel.findOne({ email });
}

/**
 * Find user by id
 *
 * @exports
 * @method Find user by id
 * @param {String} id
 * @summary Find user by id
 * @returns {Promise<UserModel>}
 */
function findUserById(id) {
  return LoginUsersModel.findOne({ _id: id });
}

/**
 * Find token in refreshTokens
 *
 * @exports
 * @method Find token in db
 * @param {String} refreshToken
 * @summary Find token in db
 * @returns {Promise<UserModel>}
 */
function refreshTokenExists(refreshToken) {
  return RefreshTokensModel.findOne({ refreshToken });
}

/**
 * Add refreshToken in refreshTokens db
 *
 * @exports
 * @method Add token in db
 * @param {String} email userEmail
 * @param {String} refreshToken
 * @summary Add token in db
 * @returns {Promise<UserModel>}
 */
async function addRefreshToken(email, refreshToken) {
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
  return RefreshTokensModel.findOneAndUpdate({ userEmail: email }, { refreshToken }, options);
}

/**
 * Remove refreshToken in refreshTokens db
 *
 * @exports
 * @method Remove token in db
 * @param {String} refreshToken
 * @summary Remove token in db
 * @returns {Promise<UserModel>}
 */
function delRefreshToken(refreshToken) {
  return RefreshTokensModel.deleteOne({ refreshToken });
}

module.exports = {
  register,
  login,
  findUserByEmail,
  findUserById,
  refreshTokenExists,
  addRefreshToken,
  delRefreshToken,
};
