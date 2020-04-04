var sequelize = require('../objects/sequelize.js');
var Person = require('../models/person.js');

exports.authenticate = function(req, res, next)
{
  // console.log(req);

  var authenticated = false;
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
        console.log("Check yo self");
        authenticated = true;
      }
    }

    res.send(authenticated);
  }).catch(err => {
    console.log(err);
  });
}
