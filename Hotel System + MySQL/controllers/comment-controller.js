const Comment = require('../models/').Comment;

module.exports = {

    delete: (req, res) => {

        let commentId = req.query.commentId;
        let hotelId = req.query.hotelId;

        Comment.destroy({where: {id: commentId}}).then(() => {

            res.redirect(`/hotel/details/${hotelId}`);

        }).catch((err) => {
            console.log(err);
            return;
        });
    }
};