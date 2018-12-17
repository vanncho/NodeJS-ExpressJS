module.exports = (sequelize, DataTypes) => {

    const Ticket = sequelize.define('ticket', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        priceCategory: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        // paranoid: false,
        // underscored: true,
        // freezeTableName: true,
        // tableName: 'purchase_orders'
    });

    Ticket.associate = function(models) {
        models.Ticket.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' })
    };

    return Ticket;
};