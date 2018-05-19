module.exports = (sequelize, DataTypes) => {

    let User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false // resolve the - SequelizeDatabaseError: Unknown column 'createdAt' in 'field list'
    });

    User.associate = function(models) {
        models.User.belongsToMany(models.Role, {through: 'users_roles', timestamps: false});
        models.User.hasMany(models.Comment);
    };

    return User;
};