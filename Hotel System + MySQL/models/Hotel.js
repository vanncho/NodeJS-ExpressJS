module.exports = (sequelize, DataTypes) => {

    let Hotel = sequelize.define('hotels', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
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
        image_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_added: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        timestamps: false, // resolve the - SequelizeDatabaseError: Unknown column 'createdAt' in 'field list'
    });

    Hotel.associate = function(models) {
        models.Hotel.hasMany(models.Comment);
    };

    return Hotel;
};