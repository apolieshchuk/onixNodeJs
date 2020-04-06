import booksModel from './model';
import { ChartInterface } from '../../interfaces';

export default class Service {
  /**
   *
   * @method getChartData
   * @returns {Promise<ChartInterface[]>}
   */
  public static async getChartData(): Promise<ChartInterface[]> {
    const test: {_id: string; value: number}[] = await booksModel.aggregate([
      {
        $group: {
          _id: '$code3',
          value: {
            $sum: 1,
          },
        },
      },
    ]);
    return test.map((obj: {_id: string; value: number}) => ({
      code3: obj._id,
      value: obj.value,
    }));
  }
}
