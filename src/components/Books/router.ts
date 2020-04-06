import * as express from 'express';
import BooksComponent from './index';

/**
 * Express router to mount books related functions on.
 * @type {Router}
 * @const
 */
const router: express.Router = express.Router();

/**
 * Route serving list of books.
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', BooksComponent.chart);

export default router;
