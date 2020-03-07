const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const GrabSchema = new Schema(
  {
    emails: {
      type: Array,
      trim: true,
    },
  },
  {
    collection: 'grabbingEmails',
    versionKey: false,
  },
);

module.exports = connections.model('GrabModel', GrabSchema);
