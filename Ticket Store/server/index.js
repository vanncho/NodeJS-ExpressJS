const express = require('express');
const cors = require('cors'); // NOT USING
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const controllers = require('./src/controllers/');
const models = require('./src/models/index');

// app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: '123456',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000 // 10 min
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
console.log('------ 1 -------')
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');    
    }

    next();
});

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
    console.log('------ 2 -------')
    if (req.session.user && req.cookies.user_sid) {

        // res.status(200).send({ data: 'authorized', errors: [] });
        next();
    } else {
        // next();
        res.sendStatus(401);
    }    
};

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {

    if (req.user) {
        res.locals.currentUser = req.user;
    }

    next();
});

require('./src/config/routes')(app, sessionChecker);
require('./src/config/passport')();

models.sequelize.sync({}).then(() => {

    console.log('--> Connected to Database <--');
    controllers.roleController.populateRoles();

    app.listen(8080, () => {
        console.log('*** Server started ***');
    });
});
