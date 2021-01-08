var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize');

var Person = require('./person.js');
var ReadState = require('./read_state.js');
var Thread = require('./thread.js');

var Message = sequelize.define('message',{
  message_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true
  },
  sent_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  sender_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Person,
      key: 'person_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  thread_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Thread,
      key: 'thread_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'message',
  updatedAt: false,
  createdAt: 'sent_date'
});

// Message.belongsTo(Thread, {foreignKey: 'thread_id', targetKey: 'thread_id'});
// Message.belongsTo(Person, {foreignKey: 'sender_id', targetKey: 'person_id'});
//
// Message.hasMany(ReadState, {foreignKey: 'message_id', targetKey: 'message_id'});

module.exports = Message;
