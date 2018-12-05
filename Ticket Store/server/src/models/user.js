module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        account_non_expired: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        account_non_locked: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        credentials_non_expired: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestamps: false
    });

    User.associate = function(models) {
        models.User.belongsToMany(models.Role, {through: 'users_roles', timestamps: false});
    };

    return User;
}