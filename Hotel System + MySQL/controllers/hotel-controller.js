const Comment = require('../models/').Comment;
const Hotel = require('../models/').Hotel;
const adminId = require('../config/roles').adminRoleId;

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

        hotel.save().then(() => {

            res.redirect('/');

        }).catch((err) => {
            console.log(err);
            return;
        });

    },
    listHotels: (req, res) => {

        Hotel.findAll({order: [['date_added', 'DESC']]}).then((hotels) => {

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

            let userRolesArray = user.dataValues.roles;

            for(let role of userRolesArray) {

                if (adminId === role.dataValues.id) {
                    isAdmin = true;
                    break;
                }
            }
        }

        Hotel.findById(hotelId, {
            include:[
                {
                    model: Comment,
                    as: 'comments'
                }]
        }).then((hotel) => {

            let comments = hotel.dataValues.comments;

            res.render('hotel/details', {hotel, comments, isAdmin});

        }).catch((err) => {
            console.log(err);
            return;
        });
    },
    detailsPost: (req, res) => {

        let userId = req.user.dataValues.id;
        let username = req.user.dataValues.username;
        let hotelId = req.params.hotelId;
        let commentText = req.body.comment;

        Hotel.findById(hotelId).then(() => {

            const comment = Comment.build({
                text: commentText,
                userId: userId,
                username: username,
                hotelId: hotelId
            });

            comment.save().then(() => {
            });
        }).catch((err) => {
            console.log(err);
            return;
        });

        res.redirect(`/hotel/details/${hotelId}`);
    }
};