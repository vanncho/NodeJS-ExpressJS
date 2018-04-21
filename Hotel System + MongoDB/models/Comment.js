const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    text: { type: mongoose.Schema.Types.String, required: true, unique: true },
    user :{ type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;