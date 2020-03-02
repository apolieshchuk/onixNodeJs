const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const ScreenSchema = new Schema(
  {
    screenUrl: {
      type: String,
      trim: true,
    },
  },
  {
    collection: 'screenshots',
    versionKey: false,
  },
);

module.exports = connections.model('ScreenModel', ScreenSchema);
