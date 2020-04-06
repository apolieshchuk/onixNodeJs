const path = require('path');
const csv = require('csvtojson');
function getBooksFromCsv() {
    return csv().fromFile(path.join(__dirname, '../../books.csv'));
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
    async down(db, client) { },
};
