// This table represents the questionnaire that freelancers receive after
// completing a project. They use this questionnaire to rate the interactions
// that they had with the client throughout the project.
var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');

var Bid = require('./bid.js');

var FreelancerQuestionnaire = sequelize.define('freelancer_questionnaire', {
  freelancer_questionnaire_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  performance_rating: {
    type: Sequelize.DECIMAL(2,1),
    allowNull: false
  },
  comments: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  bid_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Bid,
      key: 'bid_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'freelancer_questionnaire',
  updatedAt: false,
  createdAt: false
});
