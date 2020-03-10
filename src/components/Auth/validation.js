const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
  /**
     * @param {String} newUser.name
     * @param {String} newUser.login
     * @param {String} newUser.password
     * @param {String} csrf if need
     * @returns
     * @memberof UserValidation
     */
  register(newUser) {
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

  /**
   * @param {String} user.login
   * @param {String} user.password
   * @param {String} csrf if need
   * @returns
   * @memberof UserValidation
   */
  login(user) {
    return this.Joi
      .object({
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
      .validate(user);
  }
}

module.exports = new AuthValidation();
