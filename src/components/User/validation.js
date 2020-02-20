const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const schema = Joi.object({
  id: Joi.objectId().required(),

  email: Joi.string()
    .email()
    .min(5)
    .max(30)
    .required(),

  name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\\s]{3,30}$'))
    .required(),
})
  .with('email', 'name');

module.exports = schema;
