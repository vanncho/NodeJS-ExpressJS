const Sequelize = require('sequelize');
const dbConfig = require('../config/config').development.database;

const sequelize = new Sequelize(dbConfig.databaseName, dbConfig.databaseLogin, dbConfig.databasePass, {
    dialect: dbConfig.databaseDialect,
    host: dbConfig.host,
    port: dbConfig.databasePort,
    operatorsAliases: false, // hide deprecation warning in console
    pool: {
        max: 1,
        min: 1,
        idle: 10000
    }
});

const models = {
    User: sequelize.import('./User'), // on windows -> user, linux -> User
    Role: sequelize.import('./Role'), // on windows -> role, linux -> Role
    UserRole: sequelize.import('./UserRole'), // on windows -> userrole, linux -> UserRole
    Comment: sequelize.import('./Comment'), // on windows -> comment, linux -> Comment
    Hotel: sequelize.import('./Hotel')  // on windows -> hotel, linux -> Hotel
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;