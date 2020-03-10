const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const LoginUsersSchema = new Schema(
  {
    name: {
      type: String,
    },
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'loginUsers',
    versionKey: false,
  },
);

module.exports = connections.model('LoginUsersModel', LoginUsersSchema);
