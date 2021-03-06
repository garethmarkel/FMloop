//define our Thread participant tracking model
var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');

var Thread = require('./thread.js');
var Person = require('./person.js');

/*
person_id INTEGER,
thread_id INTEGER,
PRIMARY KEY (person_id, thread_id),
FOREIGN KEY (thread_id) REFERENCES thread (id)
ON UPDATE RESTRICT ON DELETE RESTRICT,
FOREIGN KEY (person_id) REFERENCES person (id)
ON UPDATE RESTRICT ON DELETE RESTRICT
*/
var ThreadParticipant = sequelize.define('thread_participant', {
  person_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Person,
      key: 'person_id',
      onUpdate:'restrict',
      onDelete: 'restrict'
    }
  },
  thread_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Thread,
      key: 'thread_id',
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

// ThreadParticipant.belongsTo(Thread, {foreignKey: 'thread_id', targetKey: 'thread_id'});
// ThreadParticipant.belongsTo(Person, {foreignKey:'person_id', targetKey:'person_id'});

module.exports = ThreadParticipant;
