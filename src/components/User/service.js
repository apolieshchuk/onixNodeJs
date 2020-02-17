const UserModel = require('./model');

module.exports = {
  /**
     * @exports
     * @method findAll
     * @param {}
     * @summary get list of all users
     * @returns Promise<UserModel[]>
     */
  async findAll() {
    return UserModel.find({});
  },
  /**
     * @exports
     * @method addUser
     * @param {}
     * @summary add user to collection db
     * @returns Promise<UserModel[]>
     */
  async addUser(user) {
    return UserModel.collection.insertOne(user);
  },
};
