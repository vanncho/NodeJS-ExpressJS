module.exports = (sequelize, DataTypes) => {

    let Role = sequelize.define('roles', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    Role.associate = function (models) {
        models.Role.belongsToMany(models.User, { through: 'users_roles', timestamps: false });
    };

    return Role;
};