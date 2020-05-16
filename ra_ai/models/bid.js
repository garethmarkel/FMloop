var Sequelize = require('Sequelize');
var sequelize = require('../objects/sequelize.js');
var Person = require('./person.js');
var Project = require('./project.js');

var Bid = sequelize.define('bid', {
  project_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Project,
      key: 'project_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  contractor_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Person,
      key: 'person_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  },
  projected_finish: {
    type: Sequelize.DATE,
    allowNull: false
  },
  performance_rating: {
    type: Sequelize.DECIMAL(2,1),
    allowNull: true,
    defaultValue: null
  },
  is_contract: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  proposal: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'contract',
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
