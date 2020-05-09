var sequelize = require('../objects/sequelize.js');
var Project = require('../models/project.js');
var Sequelize = require('sequelize');

exports.createProject = function(req, res, next)
{
  return Project.create({
    title: req.body.title,
    explanation: req.body.explanation,
    price: req.body.price,
    due_date: req.body.due_date,
    owner_id: req.body.owner_id
  }).then(function (project) {
    res.json({project: project.dataValues});
  }).catch(function (err) {
    res.status(500).send('Something went wrong. Please try again!');
  });
}
