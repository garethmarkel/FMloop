/*
This model represents a temporary bid that a freelancer submits to a project
in order to get approval to being working on said project.
*/

var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');
var Freelancer = require('./freelancer.js');
var Project = require('./project.js');

var Bid = sequelize.define('bid', {
  /*
  The primary key.
  */
  bid_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  /*
  The project_id.
  */
  project_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Project,
      key: 'project_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  /*
  The foreign key that represents the freelancer that is making the bid.
  */
  contractor_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Freelancer,
      key: 'person_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  /*
  The date that freelancers can set on when they think that they can
  get the project done.
  */
  projected_finish: {
    type: Sequelize.DATE,
    allowNull: false
  },
  /*
  The rating that a project owner sets after a project has been completed
  on how well the freelancer completed the project.
  */
  performance_rating: {
    type: Sequelize.DECIMAL(2,1),
    allowNull: true,
    defaultValue: null
  },
  /*
  Denotes on whether the project owner has accepted the bid. After accepting,
  the freelancer can begin working on the project.
  */
  is_contract: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  /*
  The description that the feelancer will input on how he/she will plan on
  finishing the project.
  */
  proposal: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'bid',
  updatedAt: false,
  createdAt: false,
  setterMethods: {
    setRating: function(value){
      this.setDataValue('performance_rating', value);
    }
  }
});

// Project.hasMany(Bid, {foreignKey: 'project_id', targetKey: 'project_id'});
// Bid.belongsTo(Project, {foreignKey: 'project_id', targetKey: 'project_id'});
// Bid.belongsTo(Person, {foreignKey: 'contractor_id', targetKey: 'person_id'});

module.exports = Bid;
