const passport = require('passport');

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect(302, '/auth/login');
}

function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect(302, '/users');
  }
  return next();
}

function localAuth() {
  return passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/auth/login',
    failureFlash: true,
  });
}


module.exports = {
  localAuth,
  checkAuth,
  checkNotAuth,
};
