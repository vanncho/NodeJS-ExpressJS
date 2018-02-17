const User = require('../models/User');
const Thread = require('../models/Thread');
const encryption = require('../util/encryption');

module.exports = {

    register: {
        get: (req, res) => {

            res.render('user/register');
        },
        post: (req, res) => {

            let userData = req.body;

            if (userData.password && userData.password !== userData.confirmedPassword) {

                userData.error = 'Passwords do not match';
                res.render('user/register', userData);
                return;
            }

            let salt = encryption.generateSalt();
            userData.salt = salt;

            if (userData.password) {

                userData.hashedPass = encryption.generateHashedPassword(salt, userData.password);
            }

            User.create(userData)
                .then(user => {

                    req.logIn(user, (err, user) => {

                        if (err) {
                            res.render('users/register', {error: 'Wrong credentials!'});
                            return;
                        }

                        res.redirect('/');
                    })
                })
                .catch(error => {

                    userData.error = error;
                    res.render('user/register', userData);
                })
        }
    },
    login: {

        get: (req, res) => {
            res.render('user/login');
        },
        post: (req, res) => {

            let userData = req.body;

            User.findOne({username: userData.username}).then(user => {

                if (!user || !user.authenticate(userData.password)) {

                    res.render('user/login', {error: 'Wrong credentials!'});
                    return;
                }

                req.logIn(user, (err, user) => {

                    if (err) {
                        res.render('user/login', {error: 'Wrong credentials!'});
                        return;
                    }

                    res.redirect('/');
                })
            })
        }
    },
    logout: (req, res) => {

        req.logout();
        res.redirect('/')
    },
    find: {

        get: (req, res) => {

            let currentUser = req.user.username;
            let otherUser = req.query.username;

            if (currentUser === otherUser) {
                return res.redirect('/?error=Cannot chat with yourself!');
            }

            User.findOne({username: otherUser}).then((foundUser) => {

                if (!foundUser) {
                    return res.redirect('/?error=User does not exist!');
                }

                Thread.findOne({users: {$all: [currentUser, otherUser]}}).then((existingThread) => {

                    if (!existingThread) {

                        Thread.create({users: [currentUser, otherUser]}).then((createdThread) => {

                            foundUser.otherUsers.push(req.user._id);
                            req.user.otherUsers.push(foundUser._id);
                            Promise.all([foundUser.save(), req.user.save()]);
                        })
                    }

                    res.redirect(`/thread/${foundUser.username}`);
                })
            });
        }
    },
    block: {
        get: (req, res) => {

            let userId = req.params.userId;

            if (!req.user.blockedUsers) {
                req.user.blockedUsers = [];
            }

            req.user.blockedUsers.push(userId);
            req.user.save().then(() => res.redirect('/'));
        }
    },
    unblock: {
        get: (req, res) => {

            let userId = req.params.userId;
            let blockedUsers = req.user.blockedUsers.filter(x => x !== userId);

            req.blockedUsers = blockedUsers;
            req.user.save().then(() => res.redirect('/'));
        }
    }
};
