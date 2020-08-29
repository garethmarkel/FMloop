// This table represents the questionnaire that clients receive after
// their project is completed. They use this questionnaire to rate the interactions
// that they had with the freelancer and the performance of the work that he/she
// did on the project.
var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');

var Bid = require('./bid.js');

var ClientQuestionnaire = sequelize.define('client_questionnaire', {
  client_questionnaire_id: {
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
  tableName: 'client_questionnaire',
  updatedAt: false,
  createdAt: false
});
