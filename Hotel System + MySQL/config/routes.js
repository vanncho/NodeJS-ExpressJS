const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {

    app.get('/', controllers.home.index);

    app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);

    app.get('/profile/:id', restrictedPages.isAuthen, controllers.user.profileGet);

    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);

    app.post('/logout', controllers.user.logout);

    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    app.get('/hotel/add', restrictedPages.isAuthen, controllers.hotel.addGet);
    app.post('/hotel/add', restrictedPages.isAuthen, controllers.hotel.addPost);

    app.get('/hotel/list', controllers.hotel.listHotels);

    app.get('/hotel/details/:hotelId', controllers.hotel.detailsGet);
    app.post('/hotel/details/:hotelId', restrictedPages.isAuthen, controllers.hotel.detailsPost);

    app.get('/comment/delete', restrictedPages.hasRole('Admin'), controllers.comment.delete);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};