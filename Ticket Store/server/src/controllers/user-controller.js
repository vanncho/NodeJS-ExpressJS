const encryption = require('../utils/encryption');
const log4js = require('log4js');

const User = require('../models/').User;
const Role = require('../models/').Role;
// const UserRole = require('../models/').UserRole;

const adminId = require('../config/roles').adminRoleId;
const userId = require('../config/roles').userRoleId;
const Sequelize = require('sequelize');
log4js.configure({
    appenders: { 'user-controller': { type: 'file', filename: 'errors.log' } },
    categories: { default: { appenders: ['user-controller'], level: 'ALL' } },
});

const logger = log4js.getLogger('user-controller');


module.exports = {

    userRegister: (req, res) => {

        const errors = validateUserInputs(req.body);

        if (errors.length === 0) {

            encryption.hashPassword(req.body.password).then(hashedPassword => {

                const user = User.build({ 
                    email: req.body.email,
                    username: req.body.username,
                    password: hashedPassword,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    account_non_expired: req.body.account_non_expired,
                    account_non_locked: req.body.account_non_locked,
                    credentials_non_expired: req.body.credentials_non_expired
                });
                // }, {
                //     include: [{ model: Role, as: 'role'}]
                // });
    
                User.count().then((count) => {

                    let roleId = userId;

                    if (count === 0) {
                        roleId = adminId;
                    }

                    Role.findByPk(roleId).then(role => {

                        user.save().then((savedUser) => {

                            savedUser.setRole(role);
                            res.status(200).send({ data: 'Success', errors: [] });
                            
                        }).catch(err => {

                            if (err.parent.code === 'ER_DUP_ENTRY') {
            
                                res.status(200).send({ errors: ['Username already taken!'] });
                            } else {
                                 logger.error(err);
                            }
              
                        });
                    });
                });
            });

        } else {

            res.status(400).send({ errors: errors });
        }
            
    },
    userLogin: async (req, res) => {

        const reqUser = req.body;

        try {

            User.findOne({ 
                where: { username: reqUser.username },
                include: [{ model: Role, as: 'role', required: true }] }).then(user => {

                encryption.comparePasswords(reqUser.password, user.password).then(verified => {

                    if (verified) {

                        const userDetails = {
                            userId: user.id,
                            fullName: user.first_name + ' ' + user.last_name,
                            role: user.role.role
                        };
    
                        req.logIn(user, function(err) {
                            console.log(err)
                            if (err) { return next(err); }
    
                            req.session.user = user.dataValues;
                            res.status(200).send({ data: userDetails, errors: [] });
                        });
                    } else {
                        res.status(200).send({ errors: ['Invalid username or password!'] });
                    }
                });
            });

        } catch (err) {

            console.log('--- LOGIN ERRRR ---');
            console.log(err);
        }
    },
    userLogout: (req, res) => {
        console.log('userLogout')
        req.session.destroy(() => {

            req.logout();
            console.log('destroy')
            res.status(200).send({ data: 'Logout success', errors: [] });
        });
    },
    getAllUsers: (req, res) => {
        console.log('getAllUsers - REQUEST')
        const roleFilter = req.body;

        User.findAll({ 
            raw: true,
            attributes: ['id', 'username', 'first_name', 'last_name', 'email', 'account_non_locked', Sequelize.literal('role')],
            include: [{
                model: Role,
                as: 'role',
                where: roleFilter
            }]
        }).then(users => {

            res.status(200).send({ data: users, errors: [] });
        });

    },
    getUserById: (req, res) => {

        
        const userId = req.params.id;
        User.findByPk(userId, {
            raw: true,
            attributes: ['id', 'username', 'first_name', 'last_name', 'email', 'account_non_locked', Sequelize.literal('role')],
            include: [{
                model: Role,
                as: 'role'
            }]
        }).then(user => {

            res.status(200).send({ data: user, errors: [] });
        });
    },
    editUser: (req, res) => {

        const userUpdate = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            roleId: req.body.roleId
        };

        User.update(userUpdate, { where: { id: req.body.id }}).then(rows => {

            res.status(200).send({ errors: [] });
        });
        
    },
    lockUnlockUser: (req, res) => {
// TODO: disable locked user actions!

        const userUpdate = {
            account_non_locked: req.body.nonLocked
        };

        User.update(userUpdate, { where: { id: req.body.id } }).then(rows => {

            res.status(200).send({ errors: [] });
        });
    }
};

const validateUserInputs = function(reqUser) {

    const errors = [];

    if (reqUser.password === '' || reqUser.password.match(/(\s)/)) {

        logger.warn(`Password must not be empty or contains spaces! - [${reqUser.password}]`);
        errors.push('Password must not be empty or contains spaces!');
    }

    if (reqUser.email === '' || !reqUser.email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {

        logger.warn(`Email format is not valid! - [${reqUser.email}]`);
        errors.push('Email format is not valid!');
    }

    if (reqUser.first_name === '' || !reqUser.firstName.match(/^([A-Z]+[a-z]+)$/)) {

        logger.warn(`Incorrect first name. - [${reqUser.firstName}]`);
        errors.push('Incorrect first name.');
    }

    if (reqUser.last_name === '' || !reqUser.lastName.match(/^([A-Z]+[a-z]+)$/)) {

        logger.warn(`Incorrect last name. - [${reqUser.lastName}]`);
        errors.push('Incorrect last name.');
    }

    return errors;
};