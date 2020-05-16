//define person model for users
var Sequelize = require('Sequelize');
var sequelize = require('../objects/sequelize.js');

var ThreadParticipant = require('./thread_participant.js');
var Project = require('./project.js');
var ReadState = require('./read_state.js');
var Message = require('./message.js');
var Bid = require('./bid.js');
var HasSkill = require('./has_skill.js');
var Thread = require('./thread.js');
var Skill = require('./skill.js');
/*
id INTEGER PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(30) NOT NULL,
title VARCHAR(30) NULL,
email VARCHAR(30) NOT NULL UNIQUE,
passphrase VARCHAR(20) NOT NULL,
user_rating DECIMAL(2, 1) NULL
*/
var Person = sequelize.define('person', {
  person_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true
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
    unique: true,
    validate: {
      isUnique: function (value, next) {
        var self = this;
        Person.findOne({where: {email: value}})
          .then(function(person) {
            if(person) {
              return next('Email already in use!');
            }
            return next();
          }).catch(function(err) {
            return next(err);
          });
      }
    }
  },
  passphrase: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  freelancer: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: false
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
  }
});

// Person.hasMany(Message, {foreignKey: 'person_id', targetKey:'sender_id'});
// Person.hasMany(ReadState, {foreignKey:'person_id', targetKey:'reader_id'});
// Person.hasMany(Project, {foreignKey: 'person_id', targetKey: 'owner_id'});
// Person.hasMany(Bid, {foreignKey: 'person_id', targetKey: 'contractor_id'});
// Person.hasMany(ThreadParticipant, {foreignKey: 'person_id', targetKey: 'person_id'});
// Person.hasMany(HasSkill, {foreignKey: 'person_id', targetKey: 'person_id'});
//
// Person.belongsToMany(Thread, {through: 'thread_participant', foreignKey:'person_id', otherKey:'person_id',foreignKey:'thread_id'});
// Person.belongsToMany(Skill, {through: 'has_skill', foreignKey:'person_id', otherKey:'skill_id', foreignKey:'skill_id'});

module.exports = Person;
