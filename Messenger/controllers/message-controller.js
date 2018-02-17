const Message = require('../models/Message');

module.exports = {

    like: (req, res) => {

        toggle(req, res, 'like');
    },

    unlike: (req, res) => {
        toggle(req, res, 'unlike');
    }
};

function toggle(req, res, action) {

    let messageId = req.params.messageId;

    Message.findById(messageId).then((message) => {

        if (!message) {
            return res.redirect('/?error=Message no longer exists.');
        }

        let isLiked = message.isLiked;

        if (action === 'like') {

            isLiked = true;
            message.likedUser = req.user._id;

        }
        if (action === 'unlike') {

            isLiked = false;
            message.likedUser = null;
        }

        message.isLiked = isLiked;
        message.save().then(() => res.redirect('/'));
    })
}