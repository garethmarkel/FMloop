var Sequelize = require('Sequelize');
var Person = require('./person.js');
var sequelize = require('../objects/sequelize.js');

var Contract = sequelize.define('contract', {
  project_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Project,
      key: 'id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  contractor_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Person,
      key: 'id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  completion_date: {
    type: Sequelize.DATETIME,
    allowNull: true,
    defaultValue: null
  },
  performance_rating: {
    type: Sequelize.DECIMAL(2,1),
    allowNull: true,
    defaultValue: null
  }
}, {
  freezeTableName: true,
  tableName: 'contract',
  updatedAt: false,
  createdAt: false,
  setterMethods: {
    setCompleted: function(){
      this.setDataValue('completion_date', Sequelize.NOW);
    },
    setRating: function(value){
      this.setDataValue('performance_rating', value);
    },
    setContractor: function(Person){
      this.setDataValue('performance_rating', Person.id);
    }
  },
  getterMethods: {
    getCompleted: function(){
      return this.completion_date;
    },
    getRating: function(){
      return this.performance_Rating;
    }
  }
});

module.exports = Contract;
