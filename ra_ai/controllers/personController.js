/*
This is the controller that handles the actions that a person model
can do like authenticate, log out, create an account, etc.
*/

var sequelize = require('../objects/sequelize.js');
var Person = require('../models/person.js');
var Sequelize = require('sequelize');

exports.authenticate = function(req, res)
{
  // can probably get rid of all these prints
  // console.log('auth');
  var auth = false;
  // apparently we need a second '.' as an escape character
  var email = req.params.email.replace('..','.');
  var password = req.params.passphrase;
  var data = null;

  // snag the user from the db with a matching email
  Person.findOne({ where: { email: email } }).then(result => {
    // if there is a match in the database
    if (result != null)
    {
      var foundPassphrase = result.dataValues.passphrase;
      // can probably remove these prints
      // console.log(foundPassphrase);
      // console.log(password);
      // if the password the user entered matches what we have in the db
      if (foundPassphrase === password)
      {
        // let them log in and load the rest of their info
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
    // if there was no match in the database authenticated will be false and data null
    var response = {
      authenticated: auth,
      person: data
    }

    res.json(response);
    // if there is an error we somehow haven't caught yet it will be caught here
  }).catch(err => {
    res.status(500).send('Something went wrong. Please try again!');
  });
}
// function to create account
exports.createAccount = function(req, res)
{
  // can probably remove all these prints
  console.log('TEST');
  console.log(req.body);
  return Person.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    passphrase: req.body.passphrase
  }).then(function (person) {
    res.status(200).send('Good job!');
  }).catch(function (err) {
    console.log(err);
    if(err.errors[0].type == 'Validation error'){
      res.status(422).send('User already exists!');
    } else {
      res.status(500).send('Something went wrong. Please try again!');
    }
  });
}
// Function to edit an existing account
exports.editAccount = function(req, res, next)
{
  // console.log('edit');
  //find person by id
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

// Function to set an en existing person to a freelancer
exports.becomeFreelancer = function(req, res, next)
{
  //find person by id
  return Person.findOne({ where: { person_id: req.body.person_id } })
    .then(function(person) {
      //set values
      person.freelancer = true;
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
