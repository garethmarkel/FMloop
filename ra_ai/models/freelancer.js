/*
this model represents users who
have defined themselves as freelancers.
it records person_id, hours_Available, and experience
*/

var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');

//import related models
var Person = require('./person.js');

var Freelancer = sequelize.define('freelancer', {
  //id of the person who the freealncer is
  person_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Person,
      key: 'person_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  //how many hours per week the freelancer is available
  hours_available:{
    type: Sequelize.INTEGER
  },
  //how long they've been freealncing
  freelancing_years: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  tableName: 'freelancer',
  updatedAt: false,
  createdAt: false
});

module.exports = Freelancer;
