module.exports = (sequelize, DataTypes) => {

    const Event = sequelize.define('event', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        town: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
        // paranoid: false,
        // underscored: true,
        // freezeTableName: true,
        // tableName: 'purchase_orders'
    });

    Event.associate = function(models) {
        models.Event.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' })
    };

    return Event;
};