const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Comment = require('../models/Comment');
const Hotel = require('../models/Hotel');

module.exports = {

    registerGet: (req, res) => {

        res.render('users/register');
    },
    registerPost: async (req, res) => {

        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);

        try {

            if (reqUser.password === '' || reqUser.password.match(/(\s)/)) {
                throw new Error('Password must not be empty or contains spaces!');
            }

            const user = await User.create({

                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: []
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
    },
    loginPost: async (req, res) => {

        const reqUser = req.body;

        try {

            const user = await User.findOne({ username: reqUser.username });

            if (!user) {

                errorHandler('Invalid user data');
                return;
            }

            if (!user.authenticate(reqUser.password)) {

                errorHandler('Invalid user data');
                return;
            }

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