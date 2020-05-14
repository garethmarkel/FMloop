//Define model for comment threads on projects

var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');
var Project = require('./project.js');

/*
id INTEGER PRIMARY KEY AUTO_INCREMENT,
project_id INTEGER,
FOREIGN KEY (project_id) REFERENCES project (id)
ON UPDATE RESTRICT ON DELETE RESTRICT
*/
var Thread = sequelize.define('thread', {
  thread_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Project,
      key: 'id',
      onUpdate:'restrict',
      onDelete: 'restrict'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'thread',
  updatedAt: false,
  createdAt: false
});

module.exports = Thread;
