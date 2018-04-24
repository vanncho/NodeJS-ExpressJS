const Sequelize = require('sequelize');

function connectDB() {

    return new Sequelize('hotelsystem', 'root', '1234', {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        operatorsAliases: false, // hide deprecation warning in console
        pool: {
            max: 1,
            min: 1,
            idle: 10000
        }
    });
}

module.exports = {
    connectDB
};