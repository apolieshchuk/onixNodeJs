const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const AuthService = require('../components/Auth/service');

const authenticateUser = async (email, password, done) => {
  try {
    const user = await AuthService.findUserByLogin(email);
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
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
      const user = await AuthService.findUserById(id);
      return done(null, user);
    });
  },
};
