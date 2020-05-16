var Sequelize = require("Sequelize");
var sequelize = require('../objects/sequelize.js');

var Person = require('./person.js');
var Thread = require('./thread.js');
var Bid = require('./bid.js');
var Document = require('./document.js');

var Project = sequelize.define("project", {
  project_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: Bid,
      key: 'project_id'
    }
  },
  title: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  explanation: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(5, 2),
    allowNull: false
  },
  due_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  created: {
    type: Sequelize.DATE,
    allowNull: false
  },
  completion_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  owner_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Person,
      key: 'person_id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
    },
    contracted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }
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
  },
  getterMethods: {
    getTitle: function(){
      return this.title;
    },
    getExplanation: function() {
      return this.explanation;
    },
    getPrice: function() {
      return this.price;
    },
    getDueDate: function() {
      return this.due_date;
    },
    getCreated: function() {
      return this.created;
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
