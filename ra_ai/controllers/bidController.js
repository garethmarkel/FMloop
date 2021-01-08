var sequelize = require('../objects/sequelize.js');
var Project = require('../models/project.js');
var Bid = require('../models/bid.js');
var Person = require('../models/person.js');

/* control bidding logic */

//get all bids for a project
exports.getBids= function(req, res, next){

  //perform our table join setup. these are confusing. no i don't have a clarification.
  Person.hasMany(Bid, {foreignKey: 'contractor_id', targetKey: 'person_id'});
  Bid.belongsTo(Person, {foreignKey: 'contractor_id', targetKey: 'person_id'});

  Bid.findAll({where:
    {project_id: req.body.project_id},
    include: [{
      model: Person
    }]
  }).then((result) => {
    var ret = [];
    console.log(result);
    if(typeof result[0] !== 'undefined'){
      ret = result.map(bid => bid.dataValues);
    };
    console.log(ret);
    res.json({bids: ret});
  }).catch(err => { return next(err); });
}

//get all bids for a project
exports.getProjectBid = function(req, res, next){

  //perform our table join setup. these are confusing. no i don't have a clarification.

  Bid.findOne({where:
    {
      project_id: req.body.project_id,
      contractor_id: req.body.contractor_id
    }
  }).then((result) => {
    res.json({bid: result.dataValues});
  }).catch(err => { return next(err); });
}


//function to submit bid
exports.submitBid = function(req, res, next) {

  Bid.create({
    project_id: req.body.project_id,
    contractor_id: req.body.contractor_id,
    projected_finish: req.body.projected_finish,
    proposal: req.body.proposal
  }).then((bid) => {
    res.json({bid: bid.dataValues});
  }).catch((err) => {
    res.status(500).send('You broke it');
  });
}

//function to submit bid
exports.setContracted = function(req, res, next) {
  Bid.findOne({where:
    {
      project_id: req.body.project_id,
      contractor_id: req.body.contractor_id
    }
  }).then((result) => {
    console.log('one');
    result.is_contract = true;
    result.save().then((data) => {
      console.log(data);
      res.status(200).json({success : true})
    }).catch(err => { return next(err); });
  }).catch(err => { return next(err); });
}
