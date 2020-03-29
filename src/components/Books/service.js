const booksModel = require('./model');

/**
 *
 * @method getChartData
 * @param {any}
 * @returns {any}
 */
async function getChartData() {
  const test = await booksModel.aggregate([
    {
      $group: {
        _id: '$code3',
        value: {
          $sum: 1,
        },
      },
    },
  ]);
  return test.map((obj) => ({
    code3: obj._id,
    value: obj.value,
  }));
}

module.exports = {
  getChartData,
};
