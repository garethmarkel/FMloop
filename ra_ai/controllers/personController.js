var sequelize = require('../objects/sequelize.js');
var Person = require('../models/person.js');
var Sequelize = require('sequelize');

exports.authenticate = function(req, res)
{
  console.log('auth');
  var auth = false;
  var email = req.params.email.replace('..','.');
  var password = req.params.passphrase;
  var data = null;

  Person.findOne({ where: { email: email } }).then(result => {
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
    }

    var response = {
      authenticated: auth,
      person: data
    }

    res.json(response);
  }).catch(err => {
    res.status(500).send('Something went wrong. Please try again!');
  });
}

exports.createAccount = function(req, res)
{
  console.log(req.body);
  return Person.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    passphrase: req.body.passphrase
  }).then(function (person) {
    res.status(200).send('Good job!');
  }).catch(function (err) {
    if(err === Sequelize.ValidationError){
      res.status(422).send('User already exists!');
    } else {
      res.status(500).send('Something went wrong. Please try again!');
    }
  });
}

exports.editAccount = function(req, res, next)
{
  console.log('edit');
  //find perosn by id
  return Person.findOne({ where: { person_id: req.body.person_id } })
    .then(function(person) {
      //set values
      person.email = req.body.email;
      person.first_name = req.body.first_name;
      person.last_name = req.body.last_name;
      //save person
      person.save().then(function(person) {

        data = {
          person_id: person.dataValues.person_id,
          first_name: person.dataValues.first_name,
          last_name: person.dataValues.last_name,
          title: person.dataValues.title,
          email: person.dataValues.email,
          freelancer: person.dataValues.freelancer,
          user_rating: person.dataValues.user_rating
        }

        res.json({
          person: data
        });
      });
    }).catch(function(err) {
    return next(err);
    }
  );
}
