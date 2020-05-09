/*
Root of the express backend server.
*/
const express = require('express');
var peopleRouter = require('./routes/people.js');
var projectsRouter = require('./routes/projects.js');

const app = express();

/*
Allows the server to parse JSON objects.
*/
app.use(express.json());

/*
This is where we put all of the defined routes for each model.
*/
app.use('/api/people', peopleRouter);
app.use('/api/projects', projectsRouter);

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);
