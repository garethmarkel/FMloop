var Sequelize = require("Sequelize");
var sequelize = require('../objects/sequelize.js');

var Person = require('./person.js');
var HasSkill = require('./has_skill.js');

var Skill = sequelize.define('skill', {
  skill_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  label: {
    type: Sequelize.STRING(20),
  }
},{
  freezeTableName: true,
  createdAt: false,
  tableName: 'skill',
  updatedAt: false,
  setterMethods: {
    setLabel: function(value){
      this.setDataValue('label', Sequelize.NOW);
    }
  }
});

// Skill.hasMany(HasSkill, {foreignKey:'skill_id', targetKey: 'skill_id'});
//
// Skill.belongsToMany(Person, {through: 'has_skill', foreignKey:'skill_id', otherKey:'person_id', targetKey: 'person_id'});

module.exports = Skill;
