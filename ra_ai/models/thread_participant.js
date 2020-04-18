var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');
var Thread = require('thread.js');
var Person = require('person.js');

var ThreadParticipant = sequelize.define('thread_participant', {
  person_id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    references: {
      model: Person,
      key: 'id',
      onUpdate:'restrict',
      onDelete: 'restrict'
    }
  },
  thread_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Thread,
      key: 'id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'thread_participant',
  updatedAt: false,
  createdAt: false
});
module.exports = ThreadParticipant;
