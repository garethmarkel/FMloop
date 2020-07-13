/*
This is the API route that allows the React front-end to call personController's
logic functions.
*/

var express = require('express');
var router = express.Router();
var personController = require('../controllers/personController.js');

router.get('/authenticate/:email/:passphrase', personController.authenticate);

router.post('/create', personController.createAccount);
router.post('/update', personController.editAccount);
router.post('/becomeFreelancer', personController.becomeFreelancer);

module.exports = router;
