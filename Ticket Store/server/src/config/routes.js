const controllers = require('../controllers/index');

module.exports = (app, sessionChecker) => {

    // Authentication
    app.post('/api/register', controllers.userController.userRegister);
    app.post('/api/login', controllers.userController.userLogin);
    app.get('/api/logout', controllers.userController.userLogout);

    // ADMIN
    app.get('/api/allUsers', controllers.userController.getAllUsers);
    app.get('/api/edit/:id', controllers.userController.getUserById);

    // Roles
    app.get('/api/allRoles', controllers.roleController.getRoles);
}