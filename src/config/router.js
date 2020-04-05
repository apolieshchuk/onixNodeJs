const express = require('express');
const http = require('http');
const BooksRouter = require('../components/Books/router');
const path = require('path');

module.exports = {
  /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
  init(app) {
    const router = express.Router();

    /**
         * Forwards any requests to the /v1/books URI to BooksRouter.
         * @name /v1/books
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
    app.use('/v1/books', BooksRouter);

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname + '/../../public/index.html'))
    });

    /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
    app.use((req, res) => {
      res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
         * @function
         * @inner
         * @param {express.Router}
         */
    app.use(router);
  },
};
