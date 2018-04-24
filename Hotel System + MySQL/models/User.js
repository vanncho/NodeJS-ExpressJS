const Sequelize = require('sequelize');

module.exports = dbConnection => {

    return dbConnection.define('users', {
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
    }, {
        timestamps: false // resolve the - SequelizeDatabaseError: Unknown column 'createdAt' in 'field list'
    });
};
