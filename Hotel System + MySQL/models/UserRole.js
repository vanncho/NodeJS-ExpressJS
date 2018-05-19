module.exports = (sequelize, DataTypes) => {

    let UserRole = sequelize.define('users_roles', {

    }, {
        timestamps: false // resolve the - SequelizeDatabaseError: Unknown column 'createdAt' in 'field list'
    });

    return UserRole;
};