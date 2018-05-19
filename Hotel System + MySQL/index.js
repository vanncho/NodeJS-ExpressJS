const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const models = require('./models/index');

const app = require('express')();
require('./config/express')(app);

require('./config/routes')(app);
require('./config/passport')();

models.sequelize.sync({}).then(() => {
    app.listen(config.port, () => {
        console.log('Server started at port ' + config.port + '...');
    });
});