const encryption = require('../util/encryption');
const dbConnection = require('../config/database').connectDB();
const User = require('../models/User')(dbConnection);

//const Comment = require('../models/Comment');
//const Hotel = require('../models/Hotel');

module.exports = {

    registerGet: (req, res) => {

        res.render('users/register');
    },
    registerPost: (req, res) => {

        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, reqUser.password);

        try {

            if (reqUser.password === '' || reqUser.password.match(/(\s)/)) {
                throw new Error('Password must not be empty or contains spaces!');
            }

            // const user = await User.create({
            //
            //     username: reqUser.username,
            //     hashedPass,
            //     salt,
            //     firstName: reqUser.firstName,
            //     lastName: reqUser.lastName,
            //     roles: []
            // });

            const user = User.build({

                username: reqUser.username,
                hashed_pass: hashedPass,
                salt: salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName
            });

            user.save().then((data) => {
                console.log(data);
            });

            req.logIn(user, (err, user) => {

                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);

                } else {
                    res.redirect('/');
                }
            });

        } catch (e) {

            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {

        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {

        res.render('users/login');

        // TEST
        // dbConnection.query('SELECT * FROM users', { model: User }).then(users => {
        //
        //             console.log(users.length);
        //
        //             for (let user of users) {
        //                 console.log(user.dataValues);
        //             }
        //
        //         }).catch(err => {
        //             console.log(err);
        //         });

        //User.findAll({where: {id: 1}}).then(users => {
        // User.findAll().then((users) => {
        //
        //     console.log(users.length);
        //
        //     for (let user of users) {
        //         console.log(user.dataValues);
        //     }
        //
        // }).catch(err => {
        //     console.log(err);
        // });
    },
    loginPost: async (req, res) => {

        const reqUser = req.body;

        try {

            const user = await User.findOne({where: { username: reqUser.username }});

            if (!user) {

                errorHandler('Invalid user data');
                return;
            }

            // if (!dbConnection.authenticate(reqUser.password)) {
            //
            //     errorHandler('Invalid user data');
            //     return;
            // }

            req.logIn(user, (err, user) => {

                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    },
    profileGet: (req, res) => {

        let username = req.params.username;

        User.findOne({username: username}).then((user) => {

            let comments = [];

            Comment.find({user: user._id}).then((foundComments) => {

                for (let comment of foundComments) {
                    comments.push(comment);
                }

                // HOTELS NOT SHOWING DUE DB IMPLEMENTATION ISSUE

                res.render('users/profile', {user, comments});
            });
        });
    },
    profilePost: (req, res) => {

        let username = req.body.username;

        User.findOne({username: username}).then((user) => {

            if (!user) {
                return res.redirect(`/?error=User "${username}" not exist.`);
            }

            res.redirect(`profile/${username}`);
        });
    }
};