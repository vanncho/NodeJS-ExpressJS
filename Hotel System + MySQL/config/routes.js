const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {

    app.get('/', controllers.home.index);

    //app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);

    //app.get('/profile/:username', restrictedPages.isAuthed, controllers.user.profileGet);
    //app.post('/profile/', restrictedPages.isAuthed, controllers.user.profilePost);

    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);

    //app.post('/logout', controllers.user.logout);

    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    //app.get('/hotel/add', restrictedPages.isAuthed, controllers.hotel.addGet);
    //app.post('/hotel/add', restrictedPages.isAuthed, controllers.hotel.addPost);

    app.get('/hotel/list', controllers.hotel.listHotels);

    //app.get('/hotel/details/:hotelId', controllers.hotel.detailsGet);
    //app.post('/hotel/details/:hotelId', restrictedPages.isAuthed, controllers.hotel.detailsPost);

    //app.get('/comment/delete', controllers.comment.delete);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};