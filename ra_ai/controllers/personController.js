var sequelize = require('../objects/sequelize.js');
var Person = require('../models/person.js');
var Sequelize = require('sequelize');

exports.authenticate = function(req, res, next)
{
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
    res.status(500).send('Something went wrong. Please try again!');
  }).catch(err => {
    return next(err);
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
    res.status(200).send('Good job!');
  }).catch(Sequelize.ValidationError, function (err) {
    ///???
    res.status(422).send('User already exists!');
  }).catch(function(err) {
    res.status(500).send('Something went wrong. Please try again!');
  }).catch(function(err) {
    console.log("You broke it. I don't know how, sorry.");
    console.log(err);
    return next(err);
  });
}
