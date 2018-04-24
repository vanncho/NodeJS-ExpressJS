const env = process.env.NODE_ENV || 'development';

//const config = require('./config/config')[env];
//require('./config/database').connectDB();

const app = require('express')();
require('./config/express')(app);

require('./config/routes')(app);
//require('./config/passport')();
//app.listen(config.port);
app.listen(3000);