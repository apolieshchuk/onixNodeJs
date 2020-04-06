const config = {
    mongodb: {
        url: 'mongodb://localhost:27017',
        databaseName: 'books_db',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
};
module.exports = config;
