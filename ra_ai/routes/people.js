var express = require('express');
var router = express.Router();
var personController = require('../controllers/personController.js');

router.get('/authenticate/:email/:passphrase', personController.authenticate);

router.post('/create', personController.createAccount);
router.post('/update', personController.editAccount);

module.exports = router;
