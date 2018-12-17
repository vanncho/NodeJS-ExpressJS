const Sequelize = require('sequelize');
require('dotenv').config()

const env = process.env;

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
   host: 'localhost',
   dialect: 'mysql',
   operatorsAliases: false,
   pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const models = {
    User: sequelize.import('./user'),
    Role: sequelize.import('./role'),
    Category: sequelize.import('./category'),
    Event: sequelize.import('./event'),
    Ticket: sequelize.import('./ticket')
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;