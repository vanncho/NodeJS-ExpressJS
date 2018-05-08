// const mongoose = require('mongoose');
//
// const commentSchema = new mongoose.Schema({
//
//     text: { type: mongoose.Schema.Types.String, required: true, unique: true },
//     user :{ type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,
//     hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }
// });
//
// const Comment = mongoose.model('Comment', commentSchema);
//
// module.exports = Comment;

const Sequelize = require('sequelize');

module.exports = dbConnection => {

    let Comment = dbConnection.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.STRING,
            allowNull: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false, // resolve the - SequelizeDatabaseError: Unknown column 'createdAt' in 'field list'
        // classMethods: {
        //     associate: function(models){
        //         Comment.belongsTo(models.Hotel, { foreignKey: 'hotel_id', foreignKeyConstraint:true} );
        //     }
        // }
    });

    return Comment;
};