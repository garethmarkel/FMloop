var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');

var Project = require('./project.js');

var Document = sequelize.define('document', {
  document_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true
  },
  doc_name: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  dir: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  project_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Project,
      key: 'project_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'document',
  updatedAt: false,
  createdAt: false,
  setterMethods: {
    setDir: function(value){
      this.setDataValue('dir', value);
    }
  }
});

// Document.belongsTo(Project, {foreignKey: 'project_id', targetKey: 'project_id'});

module.exports = Document;
