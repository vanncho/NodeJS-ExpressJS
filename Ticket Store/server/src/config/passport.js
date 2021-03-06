const LocalPassport = require('passport-local');

const User = require('../models/').User;
const Role = require('../models').Role;

const encryption = require('../utils/encryption');

module.exports = (passport) => {

    passport.use(new LocalPassport((username, pass, done) => {

        User.findOne({ where: { username: username } }).then(user => {

            if (!user) return done(null, false);
            if (false === user.dataValues.account_non_locked) return done(null, false);
            if (false === encryption.comparePasswordsAsync(pass, user.dataValues.password)) return done(null, false);

            return done(null, user);
        });
    }));

    passport.serializeUser((user, done) => {

        if (user.dataValues) return done(null, user.dataValues.id);
    });

    passport.deserializeUser((id, done) => {

        User.findByPk(id, {
            include:[
                {
                    model: Role,
                    as: 'role'
                }]
        }).then(user => {
            if (!user) return done(null, false);
            return done(null, user);
        });
    });
};