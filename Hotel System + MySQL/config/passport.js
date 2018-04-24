const passport = require('passport');
const LocalPassport = require('passport-local');
const dbConnection = require('../config/database').connectDB();
const User = require('../models/User')(dbConnection);

module.exports = () => {
    passport.use(new LocalPassport((username, password, done) => {
        User.findOne({ username: username }).then(user => {
            if (!user) return done(null, false);
            if (!user.authenticate(password)) return done(null, false);
            return done(null, user);
        });
    }));

    passport.serializeUser((user, done) => {
        if (user) return done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (!user) return done(null, false);
            return done(null, user);
        });
    });
};