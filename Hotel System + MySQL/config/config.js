module.exports = {
    development: {
        port: process.env.PORT || 3000,
        database: {
            host: 'localhost',
            databaseName: 'hotelsystem',
            databaseLogin: 'root',
            databasePass: '1234',
            databaseDialect: 'mysql',
            databasePort: 3306
        }
    },
    production: {}
};