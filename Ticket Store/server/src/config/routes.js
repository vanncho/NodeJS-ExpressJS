const controllers = require('../controllers/index');

module.exports = (app, sessionChecker) => {

    // Authentication
    app.post('/api/register', controllers.userController.userRegister);
    app.post('/api/login', controllers.userController.userLogin);
    app.get('/api/logout', controllers.userController.userLogout);

    // ADMIN - USER
    app.get('/api/allUsers', sessionChecker, controllers.userController.getAllUsers);
    app.post('/api/allUsers', sessionChecker, controllers.userController.getAllUsers);
    app.get('/api/edit/:id', sessionChecker, controllers.userController.getUserById);
    app.post('/api/edit', sessionChecker, controllers.userController.editUser);
    app.post('/api/lockUnlock', sessionChecker, controllers.userController.lockUnlockUser);

    // ADMIN - ROLE
    app.get('/api/allRoles', sessionChecker, controllers.roleController.getRoles);
}