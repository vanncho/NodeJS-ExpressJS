const Role = require('../models').Role;

module.exports = {

    populateRoles: () => {

        Role.count().then((rows) => {

            if (rows === 0) {
                const roleAdmin = Role.build({
                    role: 'ADMIN'
                });
                const roleUser = Role.build({
                    role: 'USER'
                });

                roleAdmin.save().then().catch(e => {
                    console.log(e);
                });

                roleUser.save().then().catch(e => {
                    console.log(e);
                });
            }
        });
    },
    getRoles: (req, res) => {

        Role.findAll({
            raw: true,
            attributes: ['role']
        }).then(roles => {
            console.log(roles);
            res.status(200).send({ data: roles, errors: [] });
        });
    }
}