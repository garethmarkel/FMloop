const express = require('express');
var peopleRouter = require('./routes/people.js');

const app = express();

app.use('/api/people', peopleRouter);

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);
