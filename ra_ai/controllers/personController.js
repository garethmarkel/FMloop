var sequelize = require('../objects/sequelize.js');
var Person = require('../models/person.js');
var Sequelize = require('sequelize');

exports.authenticate = function(req, res, next)
{
  var auth = false;
  var email = req.params.email.replace('..','.');
  var password = req.params.passphrase;
  var data = null;

  Person.findOne({ where: { email: email } }).then(result => {
    console.log(result);

    if (result != null)
    {
      var foundPassphrase = result.dataValues.passphrase;

      console.log(foundPassphrase);
      console.log(password);

      if (foundPassphrase === password)
      {
        auth = true;
        data = {
          person_id: result.dataValues.person_id,
          first_name: result.dataValues.first_name,
          last_name: result.dataValues.last_name,
          title: result.dataValues.title,
          email: result.dataValues.email,
          freelancer: result.dataValues.freelancer,
          user_rating: result.dataValues.user_rating
        }
      }

      var response = {
        authenticated: auth,
        person: data
      }
    }

    // console.log(response);
    res.json(response);
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
    console.log(err);
    res.status(422).send('User already exists!');
  }).catch(function(err) {
    console.log(err);
    res.status(500).send('Something went wrong. Please try again!');
  }).catch(function(err) {
    console.log("You broke it. I don't know how, sorry.");
    console.log(err);
    return next(err);
  });
}
