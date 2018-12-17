const controllers = require('../controllers/index');
const passport = require('passport');
module.exports = (app, sessionChecker) => {

    // Authentication
    app.post('/api/register', controllers.userController.userRegister);
    app.post('/api/login', passport.authenticate('local'), controllers.userController.userLogin);
    app.get('/api/logout', controllers.userController.userLogout);

    // ADMIN - USER
    app.get('/api/allUsers', sessionChecker, controllers.userController.getAllUsers);
    app.post('/api/allUsers', sessionChecker, controllers.userController.getAllUsers);
    app.get('/api/edit/:id', sessionChecker, controllers.userController.getUserById);
    app.post('/api/edit', sessionChecker, controllers.userController.editUser);
    app.post('/api/lockUnlock', sessionChecker, controllers.userController.lockUnlockUser);
    app.post('/api/searchUsers', sessionChecker, controllers.userController.searchUsers);

    // ADMIN - ROLE
    app.get('/api/allRoles', sessionChecker, controllers.roleController.getRoles);

    // ADMIN - CATEGORY
    app.post('/api/addCategory', sessionChecker, controllers.categoryController.addCategory);
    app.get('/api/allCategories', sessionChecker, controllers.categoryController.getCategories);
    app.get('/api/getCategory/:id', sessionChecker, controllers.categoryController.getCategoryById);
    app.post('/api/editCategory', sessionChecker, controllers.categoryController.editCategory);
    app.delete('/api/deleteCategory/:id', sessionChecker, controllers.categoryController.deleteCategory);
    app.post('/api/searchCategory', sessionChecker, controllers.categoryController.searchCategory);

    // ADMIN - EVENT
    app.get('/api/allEvents', sessionChecker, controllers.eventController.getAllEvents);
    app.post('/api/addEvent', sessionChecker, controllers.eventController.addEvent);
    app.delete('/api/deleteEvent/:id', sessionChecker, controllers.eventController.deleteEvent);
    app.get('/api/getEvent/:id', sessionChecker, controllers.eventController.getEventById);
    app.post('/api/editEvent', sessionChecker, controllers.eventController.editEvent);
    app.post('/api/searchEvent', sessionChecker, controllers.eventController.searchEvent);

    // ADMIN - TICKET
    app.post('/api/addTicket', sessionChecker, controllers.ticketController.addTicket);
    app.get('/api/getAllTickets/:id', sessionChecker, controllers.ticketController.getAllTickets);
    app.get('/api/getTicket/:id', sessionChecker, controllers.ticketController.getTicketById);
    app.post('/api/editTicket', sessionChecker, controllers.ticketController.editTicket);
    app.delete('/api/deleteTicket/:id', sessionChecker, controllers.ticketController.deleteTicket);
}