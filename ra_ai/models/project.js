var Sequelize = require("Sequelize");
var Person = require('person.js');
var sequelize = require('../objects/sequelize.js');

var Project = sequelize.define("project", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  owner_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Person,
      key: 'id',
      onUpdate: 'restrict',
      onDelete: 'restrict'
  }, {
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
      getId: function(){
        return this.id;
      },
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
      },
      getOwnerId: function() {
        return this.owner_id;
      }
    }
});

module.exports = Project;
