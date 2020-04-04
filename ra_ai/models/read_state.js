var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');
var Message = require('message.js');

var ReadState = sequelize.define('read_state', {
  reader_id: {
    type: Sequelize.INTEGER,
    references:{
      model: Person,
      key: 'id',
      onUpdate: 'restrict',
      onDelete:'restrict'
    },
    primaryKey: true
  },
  message_id:{
    type: Sequelize.INTEGER,
    references: {
      model: Message,
      key: 'id',
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
  createdAt: 'read_date',
  getterMethods: {
    getReadDate: function(){
      return this.read_date;
    },
    getMessage: function(){
      return this.message_id;
    },
    getReader: function(){
      return this.reader_id;
    }
  }
});

module.exports = ReadState;
