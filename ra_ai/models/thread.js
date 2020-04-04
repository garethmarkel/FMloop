var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');
var Project = require('project.js');

var Thread = sequelize.define('thread', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    primaryKey: true
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
  createdAt: false,
  getterMethods: {
    getThread: function(){
      return this.id;
    },
    getProject: function(){
      return this.project_id;
    }
  }
});

module.exports = Thread;
