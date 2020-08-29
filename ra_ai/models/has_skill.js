//define read state model for tables to track whether a essage has been read
var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');

var Skill = require('./skill.js');
var Person = require('./person.js');

var HasSkill = sequelize.define('has_skill', {
  skill_id: {
    type: Sequelize.INTEGER,
    references:{
      model: Skill,
      key: 'skill_id',
      onUpdate: 'restrict',
      onDelete:'restrict'
    },
    primaryKey: true,
  },
  person_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Person,
      key: 'person_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    },
    primaryKey: true
  },
  skill_level: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  tableName: 'has_skill',
  updatedAt: false,
  createdAt: false
});

// HasSkill.belongsTo(Skill, {foreignKey: 'skill_id', targetKey: 'skill_id'});
// HasSkill.belongsTo(Person, {foreignKey: 'person_id', targetKey: 'person_id'});

module.exports = HasSkill;
