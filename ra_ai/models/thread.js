//Define model for comment threads on projects
var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');

var Person = require('./person.js');
var ThreadParticipant = require('./thread_participant.js');
var Project = require('./project.js');
var ReadState = require('./read_state.js');
var Message = require('./message.js');

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
      key: 'project_id',
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

// Thread.hasMany(Message, {foreignKey: 'thread_id', targetKey: 'thread_id'});
// Thread.hasMany(ThreadParticipant, {foreignKey: 'thread_id', targetKey: 'thread_id'});
//
// Thread.belongsTo(Project, {foreignKey: 'project_id', targetKey:'project_id'});
//
// Thread.belongsToMany(Person, {through: 'thread_participant', foreignKey: 'thread_id', otherKey: 'person_id', targetKey: 'person_id'});
// Thread.belongsToMany(ReadState, {through: 'message', foreignKey: 'thread_id', otherKey: 'message_id', targetKey: 'message_id'});

module.exports = Thread;
