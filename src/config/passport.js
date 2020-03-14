const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const AuthService = require('../components/Auth/service');

const authenticateUser = async (login, password, done) => {
  try {
    const user = await AuthService.findUserByLogin(login);
    if (user == null) {
      return done(null, false, { message: 'User with that login not found' });
    }

    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    }
    return done(null, false, { message: 'Incorrect password' });
  } catch (error) {
    return done(error);
  }
};

module.exports = {

  init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'login' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
      const user = await AuthService.findUserById(id);
      return done(null, user);
    });
  },
};
