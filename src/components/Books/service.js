const path = require('path');
const csv = require('csvtojson');

/**
 *
 * @method getChartData
 * @param {any}
 * @returns {any}
 */
async function getChartData() {
  return csv().fromFile(path.join(__dirname, '../../../books.csv'));
}

module.exports = {
  getChartData,
};
