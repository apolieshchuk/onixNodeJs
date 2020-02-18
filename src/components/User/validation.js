const Joi = require('@hapi/joi');

const schema = Joi.object({
  email: Joi.string()
    .email()
    .min(5)
    .max(30)
    .required(),

  name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\\s]{3,30}$'))
    .required(),
});

const deleteSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(5)
    .max(30)
    .required(),
});


module.exports = {
  schema,
  deleteSchema,
};
