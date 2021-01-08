/*
This module instantiates a new sequelize object, which is the controller
for extracting data from the db.
*/
var Sequelize = require('sequelize');

var sequelize = new Sequelize('freelance_ai', 'root', 'password',
{
  host: 'mysql',
  port: '3306',
  dialect: 'mysql',
  pool:
  {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
