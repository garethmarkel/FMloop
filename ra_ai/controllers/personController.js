var sequelize = require('../objects/sequelize.js');
var Person = require('../models/person.js');
var Sequelize = require('sequelize');

exports.authenticate = function(req, res, next)
{
  // console.log(req);

  var auth = false;
  var email = req.params.email.replace('..','.');
  var password = req.params.passphrase;

  Person.findOne({ where: { email: email } }).then(person => {
    console.log(person);

    if (person != null)
    {
      foundPassphrase = person.dataValues.passphrase;

      console.log(foundPassphrase);
      console.log(password);

      if (foundPassphrase == password)
      {
        auth = true;
      }
    }

    res.json({authenticated: auth});
  }).catch(err => {
    console.log(err);
  });
}

exports.createAccount = function(req, res, next)
{
  return Person.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    passphrase: req.body.passphrase
  }).then(function (person) {
    console.log('magnum gong');
    console.log(res);
    res.json({beans: 'beans'});

    // return res.status(200).send({message: 'Good job'});
    // return res.status(200);
  }).catch(Sequelize.ValidationError, function (err) {
    console.log('Sequelize error');
    res.json(err);
  }).catch(function(err) {
    console.log('catch all');
    res.json(err);
  }).catch(function(err) {
    console.log('why did this trigger');
    console.log(err);
    next(err);
  });
}
