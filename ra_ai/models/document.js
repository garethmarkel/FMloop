var Sequelize = require('Sequelize');
var sequelize = require('../objects/sequelize.js');

var Document = sequelize.define('document', {
  document_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true
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
      key: 'id',
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
  },
  getterMethods: {
    getDir: function(){
      return this.dir;
    },
    getDocName: function(){
      return this.doc_name;
    }
  }
});

module.exports = Document;
