var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize');
var Person = require('./person.js');
var Message = require('./message.js');
var Thread = require('./thread.js');

var Message = sequelize.define('message',{
  message_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true
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
      key: 'id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  thread_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Thread,
      key: 'id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'message',
  updatedAt: false,
  createdAt: 'sent_date',
  getterMethods: {
    getSentDate: function(){
      return this.sent_date;
    },
    getMessage: function() {
      return this.content;
    },
  }
});

module.exports = Message;
