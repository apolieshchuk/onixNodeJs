const express = require('express');
const passport = require('passport');
const middleware = require('../config/middleware');
const routes = require('../config/router');
const passportConfig = require('../config/passport');

/**
 * @type {express}
 * @constant {express.Application}
 */
const app = express();

/**
 * @description express.Application Middleware
 */
middleware.init(app);

/**
 * @description express.Application Routes
 */
routes.init(app);

/**
 * @description passport init
 */
passportConfig.init(passport);

/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

module.exports = app;
