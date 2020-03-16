const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const LoginUsersSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
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

const RefreshTokensSchema = new Schema(
  {
    refreshToken: {
      type: String,
    },
  },
  {
    collection: 'refreshTokens',
    versionKey: false,
  },
);

module.exports = {
  LoginUsersModel: connections.model('LoginUsersModel', LoginUsersSchema),
  RefreshTokensModel: connections.model('RefreshTokensModel', RefreshTokensSchema),
};
