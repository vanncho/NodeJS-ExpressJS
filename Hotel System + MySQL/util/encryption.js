const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    generateHashedPassword: (password) => {
        return bcrypt.hash(password, saltRounds);
    },
    verifyLoginPassword: (password, hash) => {
        return bcrypt.compare(password, hash);
    }
};