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
     * @param user{email, fullName}
     * @summary add user to collection db
     * @returns Promise<UserModel[]>
     */
  async addUser(user) {
    return UserModel.create(user);
  },

  /**
     * @exports
     * @method findUser
     * @param String email
     * @summary get finded user object
     * @returns Promise<UserModel[]>
     */
  async findUser(email) {
    return UserModel.findOne({ email });
  },

  /**
   * @exports
   * @method findUser by Id
   * @param Number id
   * @summary get finded user object by user id
   * @returns Promise<UserModel[]>
   */
  async findUserById(_id) {
    return UserModel.findOne({ _id });
  },

  /**
     * @exports
     * @method updateUser
     * @param user {payload} ({id, email, name})
     * @summary change name or/and email of payload.id
     * @returns Promise<UserModel[]>
     */
  async updateUser(payload) {
    if (payload.email) {
      await UserModel.updateOne({ _id: payload.id }, { email: payload.email });
    }
    if (payload.name) {
      await UserModel.updateOne({ _id: payload.id }, { fullName: payload.name });
    }
    return UserModel.findById(payload.id);
  },

  /**
     * @exports
     * @method deleteUser
     * @param String email
     * @summary in user.email change fullName on user.fullName
     * @returns Promise<UserModel[]>
     */
  async deleteUser(_id) {
    return UserModel.deleteOne({ _id });
  },
};
