module.exports = (sequelize, DataTypes) => {

    let Comment = sequelize.define('comments', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // hotel_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
    }, {
        timestamps: false,
    });

    Comment.associate = function(models) {
        models.Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
        models.Comment.belongsTo(models.Hotel, {
            foreignKey: 'hotelId',
            onDelete: 'CASCADE',
        });
    };

    return Comment;
};