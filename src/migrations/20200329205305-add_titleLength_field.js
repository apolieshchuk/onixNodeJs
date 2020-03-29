module.exports = {
  async up(db, client) {
    const booksInDb = await db.collection('booksmodel').find({}).toArray();

    // eslint-disable-next-line no-restricted-syntax
    for (const book of booksInDb) {
      db.collection('booksmodel').updateOne({ _id: book._id },
        { $set: { titleLength: book.title.length } });
    }
  },

  async down(db, client) {},
};
