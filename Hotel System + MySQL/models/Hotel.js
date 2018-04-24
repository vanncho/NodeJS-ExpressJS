// const mongoose = require('mongoose');
//
// const hotelSchema = new mongoose.Schema({
//
//     title: { type: mongoose.Schema.Types.String, required: true, unique: true },
//     description: { type: mongoose.Schema.Types.String, required: true },
//     location: { type: mongoose.Schema.Types.String, required: true },
//     imageUrl: { type: mongoose.Schema.Types.String, required: true },
//     dateAdded: { type: mongoose.Schema.Types.Date, required: true},
//     comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
// });
//
// const Hotel = mongoose.model('Hotel', hotelSchema);

const Sequelize = require('sequelize');

module.exports = dbConnection => {

    return dbConnection.define('hotels', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        location: {
            type: Sequelize.STRING,
            allowNull: true
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        date_added: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    }, {
        timestamps: false // resolve the - SequelizeDatabaseError: Unknown column 'createdAt' in 'field list'
    });
};