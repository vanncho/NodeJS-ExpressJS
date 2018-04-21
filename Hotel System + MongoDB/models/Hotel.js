const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({

    title: { type: mongoose.Schema.Types.String, required: true, unique: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    location: { type: mongoose.Schema.Types.String, required: true },
    imageUrl: { type: mongoose.Schema.Types.String, required: true },
    dateAdded: { type: mongoose.Schema.Types.Date, required: true},
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;