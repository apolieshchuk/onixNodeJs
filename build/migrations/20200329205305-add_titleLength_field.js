module.exports = {
    async up(db, client) {
        const booksInDb = await db.collection('booksmodel').find({}).toArray();
        for (const book of booksInDb) {
            db.collection('booksmodel').updateOne({ _id: book._id }, { $set: { titleLength: book.title.length } });
        }
    },
    async down(db, client) { },
};
