module.exports = (sequelize, DataTypes) => {

    let UserRole = sequelize.define('users_roles', {

    }, {
        timestamps: false
    });

    return UserRole;
};