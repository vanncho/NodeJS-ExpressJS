module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define('cart', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        ticketsCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        // paranoid: false,
        // underscored: true,
        // freezeTableName: true,
        // tableName: 'purchase_orders'
    });

    Cart.associate = function(models) {
        models.Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }),
        models.Cart.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' }),
        models.Cart.belongsTo(models.Ticket, { foreignKey: 'ticketId', as: 'ticket' })
    };

    return Cart;
};