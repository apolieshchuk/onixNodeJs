const express = require('express');
const http = require('http');
const BooksRouter = require('../components/Books/router');
const path = require('path');
module.exports = {
    init(app) {
        const router = express.Router();
        app.use('/v1/books', BooksRouter);
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname + '/../../public/index.html'));
        });
        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });
        app.use(router);
    },
};
