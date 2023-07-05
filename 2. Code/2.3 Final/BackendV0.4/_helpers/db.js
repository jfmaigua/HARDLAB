const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
  try {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  
    // connect to db
    const sequelize = new Sequelize(database, user, password, {
        dialect: 'mysql',
        host: host,
        port: port,
        dialectOptions: {
          authPlugins: { mysql_native_password: false }, // Disable the native password plugin
        },
      });
    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
  
    // sync all models with database
    await sequelize.sync();
  
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
