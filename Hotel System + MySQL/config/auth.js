const adminId = require('../config/roles').adminRoleId;

module.exports = {

    isAuthen: (req, res, next) => {

        if (req.isAuthenticated()) {

            next();

        } else {
            res.redirect('/login');
        }
    },
    hasRole: () => (req, res, next) => {

        let isAdmin = false;
        let userRolesArray = req.user.dataValues.roles;

        for(let role of userRolesArray) {

            if (adminId === role.dataValues.id) {
                isAdmin = true;
                break;
            }
        }

        if (req.isAuthenticated() && isAdmin) {

            next();
        } else {
            res.redirect('/login');
        }
    }
};