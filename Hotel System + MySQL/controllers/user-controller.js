const encryption = require('../util/encryption');

const User = require('../models').User;
const Role = require('../models').Role;
const Comment = require('../models/').Comment;
const adminId = require('../config/roles').adminRoleId;
const userId = require('../config/roles').userRoleId;

module.exports = {

    registerGet: (req, res) => {

        Role.count().then((rows) => {

            if (rows === 0) {
                const roleAdmin = Role.build({
                    role: 'ADMIN'
                });
                const roleUser = Role.build({
                    role: 'USER'
                });

                roleAdmin.save().then().catch(e => {
                    console.log(e);
                });

                roleUser.save().then().catch(e => {
                    console.log(e);
                });
            }
        });

        res.render('users/register');
    },
    registerPost: (req, res) => {

        let inputError = 'inputError';
        let inputUsername;
        let inputFirstName;
        let inputLastName;
        const reqUser = req.body;

        try {

            inputUsername = reqUser.username;
            inputFirstName = reqUser.firstName;
            inputLastName = reqUser.lastName;

            if (reqUser.password === '' || reqUser.password.match(/(\s)/)) {
                throw new Error('Password must not be empty or contains spaces!');
            }

            if (reqUser.password !== reqUser.rePassword) {
                throw new Error('Password and repeat password do not match!');
            }

            encryption.generateHashedPassword(reqUser.password).then((hashedPass) => {

                const user = User.build({
                    username: reqUser.username,
                    password: hashedPass,
                    firstName: reqUser.firstName,
                    lastName: reqUser.lastName
                });

                User.count().then((count) => {

                    let setRoleId = userId;

                    if (count === 0) {
                        setRoleId = adminId;
                    }

                    Role.findById(setRoleId).then(role => {

                        user.save().then((savedUser) => {

                            savedUser.setRoles(role, {save: false});

                            req.logIn(savedUser, (err, user) => {

                                if (err) {
                                    res.locals.globalError = err;
                                    res.render('users/register', user);

                                } else {
                                    res.redirect('/');
                                }
                            });
                        });
                    });
                });

            }).catch((err) => {
                console.log(err);
            });

        } catch (e) {

            console.log(e);
            res.locals.globalError = e;
            res.render('users/register', {inputError, inputUsername, inputFirstName, inputLastName});
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

            const user = await User.findOne({where: { username: reqUser.username }});

            if (!user) {

                errorHandler('No user found!');
                return;
            }

            encryption.verifyLoginPassword(reqUser.password, user.dataValues.password).then((verified) => {

                if (verified) {
                    req.logIn(user, (err, user) => {

                        if (err) {
                            errorHandler(err);
                        } else {
                            res.redirect('/');
                        }
                    });
                } else {
                    errorHandler('Invalid username or password!');
                }
            }).catch((err) => {
                console.log(err);
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

        let userId = req.params.id;

        User.findById(userId).then((foundUser) => {

            let username = foundUser.dataValues.username;

            Comment.findAll({where: {userId: userId}}).then((foundComments) => {

                res.render('users/profile', {username, foundComments});
            });
        });
    }
};