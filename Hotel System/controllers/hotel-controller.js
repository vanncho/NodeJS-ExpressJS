const Hotel = require('../models/Hotel');
const Comment = require('../models/Comment');
const User = require('../models/User');

module.exports = {

    addGet: (req, res) => {

        res.render('hotel/add');

    },
    addPost: (req, res) => {

        let formData = req.body;

        let hotel = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            imageUrl: formData.imageUrl,
            dateAdded: Date.now()
        };

        Hotel.create(hotel).then(() => {

            res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    listHotels: (req, res) => {

        Hotel.find({}).sort({dateAdded: -1}).then((hotels) => {

            res.render('hotel/list', {hotels});

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    detailsGet: (req, res) => {

        let hotelId = req.params.hotelId;

        let user = req.user;
        let isAdmin = false;

        if (user) {
            isAdmin = user.isAdmin;
        }

        Hotel.findById(hotelId).then((hotel) => {

            let commensIds = hotel.comments;
            let comments = [];

            for (let comId of commensIds) {

                Comment.findById(comId).then((foundComment) => {

                    let commentText = foundComment.text;
                    let commentId = foundComment._id;

                    User.findById(foundComment.user).then((foundUser) => {

                        comments.push({text: commentText, id: commentId, hotelId: hotel._id, user: foundUser.username});
                    });
                });
            }

            res.render('hotel/details', {hotel, comments, isAdmin});

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    detailsPost: (req, res) => {

        let userId = req.user._id;
        let hotelId = req.params.hotelId;
        let comment = req.body.comment;

        Hotel.findById(hotelId).then((hotel) => {

            let commentObj = {
                text: comment,
                user: userId,
                hotel: hotelId
            };

            Comment.create(commentObj).then((com) => {

                if (!hotel.comments) {
                    hotel.comments = [];
                }

                hotel.comments.push(com._id);
                hotel.save().then(() => {


                });
            })
        }).catch((err) => {
            console.log(err);
            return;
        });

        res.redirect(`/hotel/details/${hotelId}`);
    }
};