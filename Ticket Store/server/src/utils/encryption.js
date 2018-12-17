const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    hashPassword: (password) => {

        return bcrypt.hash(password, saltRounds);
    },
    comparePasswords: (password, hash) => {

        return bcrypt.compare(password, hash);
    },
    comparePasswordsAsync: async (password, hash) => {

        return await bcrypt.compare(password, hash);
    }
};