const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

// add user validation schema
const addSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(5)
    .max(30)
    .required(),

  name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\\s]{2,30}$'))
    .required(),
});

// update user validation schema
const updSchema = Joi.object({
  id: Joi.objectId().required(),

  email: Joi.string()
    .email()
    .min(5)
    .max(30),

  name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\\s]{2,30}$')),
})
  .or('name', 'email');

// delete user validation schema
const delSchema = Joi.object({ id: Joi.objectId().required() });


module.exports = {
  addSchema,
  updSchema,
  delSchema,
};
