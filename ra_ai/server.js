const express = require('express');
var peopleRouter = require('./routes/people.js');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.use('/api/people', peopleRouter);

//var person = new Person();
// var people = await Person.findAll();
// console.log(people.every(people => people instanceof Person)); // true

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
