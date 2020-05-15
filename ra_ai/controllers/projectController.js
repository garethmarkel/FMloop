var sequelize = require('../objects/sequelize.js');
var Project = require('../models/project.js');
var Thread = require('../models/thread.js');
var ThreadParticipant = require('../models/thread_participant.js');
var Sequelize = require('sequelize');
var async = require('async');

//we're leaving this commented for now:

// exports.createProject = function(req, res, next)
// {
//   console.log(req.body.due_date);
//   return Project.create({
//     title: req.body.title,
//     explanation: req.body.explanation,
//     price: req.body.price,
//     due_date: req.body.due_date,
//     owner_id: req.body.owner_id
//   }).then(function (project) {
//     console.log(project.dataValues);
//     res.json({project: project.dataValues});
//   }).catch(function (err) {
//     console.log(err);
//     res.status(500).send('Something went wrong. Please try again!');
//   }).catch((err) => { return next(err); });
// }

//using sync.waterfall to create thing sin a way that makes more sense than transactiosn
exports.createProject = function(req, res, next)
{
  //first function can access values in environment
  async.waterfall([
    function(cb) {
      Project.create({
        title: req.body.title,
        explanation: req.body.explanation,
        price: req.body.price,
        due_date: req.body.due_date,
        owner_id: req.body.owner_id
      }).then((project) => {
        //next can only access environment: pass these down. first value is error;
        //don't need .catch because async will catch errors.
        //this seems like a house of card but mozilla reccomends it so we're doing it
        cb(null, req, project);
      });
    },
    function(req, project, cb) {
      Thread.create({
        project_id: project.project_id
      }).then((thread) => {
        cb(null, req, project, thread);
      });
    },
    function(req, project, thread, cb){
      ThreadParticipant.create({
        person_id: req.body.owner_id,
        thread_id: thread.thread_id
      }).then((participant) => {
        cb(null, req, project, thread, participant);
      });
    }
  ], function(err, results, project, thread, participant) {
    if (err) {
      res.status(500).send('Something went wrong. Please try again!');
    } else {
      res.json({project: project.dataValues});
    }
  });
}

//find existing project
exports.getProject = function(req, res, next) {
  Project.findOne({where:
    {project_id: req.body.project_id}
  }).then((project) => {
    if(project !== null) {
      if(project.dataValues.owner_id != req.body.owner_id) {
        res.status(500).send("This resource cannot be accessed");
      } else {
        res.json({project: project.dataValues});
      }
    } else {
      res.status(404).send("Project not found");
    }
  }).catch(err => { return next(err); });
}


//get all projects associated with a user for the dashboard
exports.getUserProjects = function(req, res, next) {
  Project.findAll({where:
    {owner_id: req.body.owner_id}
  }).then((dict) => {
    if(dict !== null) {
      var ret = dict.map((proj) => proj.dataValues);
      res.json({projects: ret});
    } else {
      res.status(404).send("Project not found");
    }
  }).catch(err => { return next(err); });
}
