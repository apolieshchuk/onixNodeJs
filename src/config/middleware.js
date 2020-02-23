const bodyParser = require('body-parser');
const csrf = require('csurf');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');

const csrfMiddleware = csrf({
  cookie: true,
});

module.exports = {
  /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
  init(app) {
    app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that
    // can be used to enable CORS with various options
    app.use(cors());
    // cors
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
      res.header('Access-Control-Allow-Credentials', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials',
      );
      next();
    });
    // ejs template engine
    app.set('view engine', 'ejs');
    // ejs default views path
    app.set('views', `${__dirname}/../views`);
    // add csrf protection
    app.use(csrfMiddleware);
    app.use((err, req, res, next) => {
      if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).json({
          status: `403 ${http.STATUS_CODES[403]}`,
          error: err.message,
        });
      }
    });
  },
};
