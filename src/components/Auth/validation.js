const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
  /**
     * @param {String} newUser.email
     * @param {String} newUser.name
     * @param {String} newUser.password
     * @returns
     * @memberof UserValidation
     */
  create(newUser) {
    return this.Joi
      .object({
        name: this.Joi
          .string()
          .min(3)
          .max(30),
        login: this.Joi.string()
          .email()
          .required(),
        password: this.Joi
          .string()
          .min(6)
          .max(30)
          .required(),
        _csrf: this.Joi.string(),
      })
      .validate(newUser);
  }
}

module.exports = new AuthValidation();
