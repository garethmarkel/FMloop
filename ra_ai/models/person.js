var Sequelize = require('Sequelize');
var sequelize = require('../objects/sequelize.js');

var Person = sequelize.define('person', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  title: {
    type: Sequelize.STRING(30),
    allowNull: true,
    default: null
  },
  email: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true
  },
  passphrase: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  user_rating: {
    type: Sequelize.DECIMAL(2,1),
    allowNull: true,
    default: null
  },
},{
  freezeTableName: true,
  tableName: 'person',
  updatedAt: false,
  createdAt: false,
  setterMethods: {
    setFirstName: function(value){
      this.setDataValue('first_name', value);
    },
    setRating: function(value){
      this.setDataValue('user_rating', value);
    },
    setLastName: function(value){
      this.setDataValue('last_name', value);
    },
    setTitle: function(value){
      this.setDataValue('title', value);
    },
    setEmail: function(value){
      this.setDataValue('email', value);
    },
    setPassphrase: function(value){
      this.setDataValue('passphrase', value);
    }
  },
  getterMethods: {
    getFirstName: function(){
      return this.first_name;
    },
    getRating: function(){
      return this.user_rating;
    },
    getLastName: function(){
      return this.last_name;
    },
    getTitle: function(){
      return this.title;
    },
    getEmail: function(){
      return this.email;
    },
    getPassphrase: function(){
      return this.passphrase;
    }
  }
});

module.exports = Person;
