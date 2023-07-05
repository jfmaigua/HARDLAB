require('rootpath')();
const express = require('express');
const app = express();
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const routes = require('./routes')
const config = require('./config.json');
const dbOption = config.database;

// Add the authPlugins option to use the mysql_native_password plugin
dbOption.authPlugins = { mysql_native_password: false };

app.use(myconn(mysql, dbOption, 'single'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/api', routes)

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
