const Sequelize = require('sequelize');
// const User = require('../models/User');

const dbConnection = new Sequelize('hotelsystem', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    pool: {
        max: 1,
        min: 1,
        idle: 10000
    }
});

const User = dbConnection.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hashed_pass: {
        type: Sequelize.STRING,
        allowNull: true
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: '1'
    }
});

module.exports = config => {

    dbConnection.query('SELECT * FROM users', { model: User }).then(users => {

        console.log(users.length);

        for (let user of users) {
            console.log(user.dataValues);
        }

    }).catch(err => {
        console.log(err);
    });
}

//module.exports = dbConnection;