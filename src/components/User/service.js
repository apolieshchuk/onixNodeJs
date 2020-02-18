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

  /**
     * @exports
     * @method findUser
     * @param {}
     * @summary get finded user object
     * @returns Promise<UserModel[]>
     */
  async findUser(email) {
    return UserModel.find({ email });
  },

  /**
     * @exports
     * @method updateUser
     * @param {}
     * @summary in user.email change fullName on user.fullName
     * @returns Promise<UserModel[]>
     */
  async updateUser(user) {
    return UserModel.update({ email: user.email }, { fullName: user.newFullName });
  },

  /**
     * @exports
     * @method deleteUser
     * @param {}
     * @summary in user.email change fullName on user.fullName
     * @returns Promise<UserModel[]>
     */
  async deleteUser(email) {
    return UserModel.deleteOne({ email });
  },
};
