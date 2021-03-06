//define read state model for tables to track whether a essage has been read
var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');

var Message = require('./message.js');
var Person = require('./person.js');
var Thread = require('./thread.js');

/*
reader_id INTEGER,
message_id INTEGER,
read_date TIMESTAMP NOT NULL,
PRIMARY KEY(reader_id, message_id),
FOREIGN KEY (reader_id) REFERENCES person (id)
ON UPDATE RESTRICT ON DELETE RESTRICT,
FOREIGN KEY (message_id) REFERENCES message (id)
ON UPDATE RESTRICT ON DELETE RESTRICT
  */
var ReadState = sequelize.define('read_state', {
  reader_id: {
    type: Sequelize.INTEGER,
    references:{
      model: Person,
      key: 'person_id',
      onUpdate: 'restrict',
      onDelete:'restrict'
    },
    primaryKey: true,
  },
  message_id:{
    type: Sequelize.INTEGER,
    references: {
      model: Message,
      key: 'message_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    },
    primaryKey: true
  },
  read_date: {
    type: Sequelize.DATE
  }
}, {
  freezeTableName: true,
  tableName: 'read_state',
  updatedAt: false,
  createdAt: 'read_date'
});

// ReadState.belongsTo(Message, {foreignKey: 'message_id', targetKey: 'message_id'});
// ReadState.belongsTo(Person, {foreignKey: 'reader_id', targetKey: 'person_id'});
//
// ReadState.belongsToMany(Thread, { through: 'message', foreignKey: 'message_id', otherKey: 'thread_id', targetKey:'thread_id'});

module.exports = ReadState;
