const express = require('express');
var Person = require('./models/person.js');
// var file_controller = require('path)');
var sequelize = require('./objects/sequelize.js');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});


// app.get('/route/:id/yada', file_controller.dab)
//
//
//  //file_controller.js://///////
// exports.dab = function(req, res, next){
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];
//
//   res.json(customers);
// }
///////////

// const users = await User.findAll();
// console.log(users.every(user => user instanceof User)); // true
// console.log("All users:", JSON.stringify(users, null, 2));

//var person = new Person();
// var people = await Person.findAll();
// console.log(people.every(people => people instanceof Person)); // true

Person.findAll().then(people => {
  console.log(people);
}).catch(err => {
  console.log(err);
});

/*
sequelize.query('show tables in ra_ai').then(dbs => {
  console.log(dbs);
}).catch(err => {
  console.log(err);
});
*/
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
