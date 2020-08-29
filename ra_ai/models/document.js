/*
this model represents the document uploaded with a project_id
*/

var Sequelize = require('sequelize');
var sequelize = require('../objects/sequelize.js');

var Project = require('./project.js');

var Document = sequelize.define('document', {
  //the id of the document. auto inc
  document_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  //name of the document
  doc_name: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  //where is it stored?
  dir: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  //what project does it belong to
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
