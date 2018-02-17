const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({

    content: { type: mongoose.Schema.Types.String, required: true, maxlength: 100 },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    thread: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Thread' },
    dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() },
    isLiked: { type: mongoose.Schema.Types.Boolean },
    likedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;