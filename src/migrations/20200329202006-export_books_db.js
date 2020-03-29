const path = require('path');
const csv = require('csvtojson');

/**
 * Get books data from csv
 *
 * @method getBooksFromCsv
 * @param {any}
 * @returns {any}
 */
function getBooksFromCsv() {
  return csv().fromFile(path.join(__dirname, '../../books_test.csv'));
}

module.exports = {
  async up(db, client) {
    const booksData = await getBooksFromCsv();
    booksData.forEach((book) => {
      book.createdAt = new Date();
      book.updatedAt = new Date();
    });
    await db.collection('booksmodel').insertMany(booksData);
  },

  async down(db, client) {},
};
