/*
This is the model that represents a project that a user can
be an owner of/require work to be done on. For freelancers, they will
be able to bid on and complete projects to the satisfaction of the
project owner.
*/

var Sequelize = require("sequelize");
var sequelize = require('../objects/sequelize.js');

var Person = require('./person.js');
var Thread = require('./thread.js');
var Bid = require('./bid.js');
var Document = require('./document.js');

var Project = sequelize.define("project", {
  /*
  The primary key.
  */
  project_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: Bid,
      key: 'project_id'
    }
  },
  /*
  The title of project.
  */
  title: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  /*
  A full description of the project that outlines what tasks need to be done
  and the requirements for successfully completing said tasks.
  */
  explanation: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  /*
  The price that the project owner is willing to pay to freelancers
  to complete the project.
  */
  price: {
    type: Sequelize.DECIMAL(5, 2),
    allowNull: false
  },
  /*
  The due date of the project.
  */
  due_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  /*
  Timestamp of when the project was created.
  */
  created: {
    type: Sequelize.DATE,
    allowNull: false
  },
  /*
  Date on when the project was successfully completed. This will be
  determined by the project owner after reviewing the work submitted by
  the freelancer.
  */
  completion_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  /*
  Foreign key that denotes the user that owns the project.
  */
  owner_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Person,
      key: 'person_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  /*
  Denotes whether the project has a freelancer currently working on it.
  */
  contracted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  /*
  phase the project is at at time of assignment
  */
  project_phase: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
},{
  freezeTableName: true,
  tableName: 'project',
  updatedAt: false,
  createdAt: 'created',
  setterMethods: {
    setTitle: function(title){
      this.setDataValue("title", title);
    },
    setExplanation: function(explanation){
      this.setDataValue("explanation", explanation);
    },
    setPrice: function(value){
      this.setDataValue("price", value);
    },
    setDueDate: function(date){
      this.setDataValue("due_date", date);
    }
  }
});

// Project.belongsTo(Person, {foreignKey: 'owner_id', targetKey:'person_id'});
//
// Project.hasOne(Thread, {foreignKey: 'project_id', targetKey: 'project_id'})
//
// Project.hasMany(Bid, {foreignKey: 'project_id', targetKey: 'project_id'});
// Project.hasMany(Document, {foreignKey: 'project_id', targetKey: 'project_id'});

module.exports = Project;
