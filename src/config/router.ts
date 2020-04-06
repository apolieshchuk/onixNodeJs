import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import BooksRouter from '../components/Books/router';

export default class Router {
  /**
   * @function
   * @param {express.Application} app
   * @summary init Application router
   * @returns void
   */
  public static init(app: express.Application): void {
    const router: express.Router = express.Router();

    /**
     * Forwards any requests to the /v1/books URI to BooksRouter.
     * @name /v1/books
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/v1/books', BooksRouter);

    app.get('/', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(`${__dirname}/../../public/index.html`));
    });

    /**
     * @description No results returned mean the object is not found
     * @function
     * @inner
     * @param {callback} middleware - Express middleware.
     */
    app.use((req: express.Request, res: express.Response) => {
      res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @function
     * @inner
     * @param {express.Router}
     */
    app.use(router);
  }
}
