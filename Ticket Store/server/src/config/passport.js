const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('../models/').User;
const Role = require('../models').Role;

module.exports = () => {

    passport.use(new LocalPassport((username, password, done) => {

        User.findOne({ where: { username: username } }).then(user => {
            if (!user) return done(null, false);
            if (!user.authenticate(password)) return done(null, false);
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
                    through: { attributes: ['role'] }
                }]
        }).then(user => {
            if (!user) return done(null, false);
            return done(null, user);
        });
    });
};