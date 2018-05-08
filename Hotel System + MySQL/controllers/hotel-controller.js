//const Comment = require('../models/Comment');
//const User = require('../models/User');
const dbConnection = require('../config/database').connectDB();
const Hotel = require('../models/Hotel')(dbConnection);
const Comment = require('../models/Comment')(dbConnection);

module.exports = {

    addGet: (req, res) => {

        res.render('hotel/add');
    },
    addPost: (req, res) => {

        let formData = req.body;

        const hotel = Hotel.build({
            title: formData.title,
            description: formData.description,
            location: formData.location,
            image_url: formData.image_url,
            date_added: Date.now()
        });

        hotel.save().then((savedHotel) => {

            res.redirect('/');

        }).catch((err) => {
            console.log(err);
            return;
        });

    },
    listHotels: (req, res) => {

        Hotel.findAll({order: [['date_added', 'DESC']]}).then((hotels) => {

            res.render('hotel/list', {hotels});

            for (let hotel of hotels) {
                console.log(hotel.dataValues);
            }

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    detailsGet: (req, res) => {

        let hotelId = req.params.hotelId;

        let user = req.user.dataValues;
        let isAdmin = false;

        if (user) {
            isAdmin = user.is_admin;
        }

        Hotel.findById(hotelId).then((hotel) => {

            //let commensIds = hotel.comments;
            let comments = [];

            // for (let comId of commensIds) {
            //
            //     Comment.findById(comId).then((foundComment) => {
            //
            //         let commentText = foundComment.text;
            //         let commentId = foundComment._id;
            //
            //         // User.findById(foundComment.user).then((foundUser) => {
            //         //
            //         //     comments.push({text: commentText, id: commentId, hotelId: hotel._id, user: foundUser.username});
            //         // });
            //     });
            // }

            res.render('hotel/details', {hotel, comments, isAdmin});

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    detailsPost: (req, res) => {

        let userId = req.user.dataValues.id;
        let hotelId = req.params.hotelId;
        let commentText = req.body.comment;

        Hotel.findById(hotelId).then((hotel) => {

            const comment = Comment.build({
                text: commentText,
                user_id: userId,
                hotel_id: hotelId
            });

            comment.save().then((savedComment) => {

                // if (!hotel.comments) {
                //     hotel.comments = [];
                // }
                //
                // hotel.comments.push(savedComment.id);
                // hotel.save().then(() => {
                //
                //
                // });
            })
        }).catch((err) => {
            console.log(err);
            return;
        });

        res.redirect(`/hotel/details/${hotelId}`);
    }
};