var express = require('express');
var router = express.Router();
var personController = require('../controllers/personController.js');

router.get('/authenticate/:email/:passphrase', personController.authenticate);

router.post('/create', personController.createAccount);

module.exports = router;
