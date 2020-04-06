import * as express from 'express';
import Service from './service';

export default class Books {
  /**
   * @function
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   * @returns {Promise < void >}
   */
  public static async chart(req: express.Request,
    res: express.Response, next: express.NextFunction): Promise<any> {
    try {
      return res.status(200).json({
        data: await Service.getChartData(),
      });
    } catch (error) {
      res.status(500).json({
        message: error.name,
        details: error.message,
      });
      return next(error);
    }
  }
}
