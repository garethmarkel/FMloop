var express = require('express');
var router = express.Router();
var projectController = require('../controllers/projectController.js');

router.post('/create', projectController.createAccount);
//router.post('/update', personController.editAccount);

module.exports = router;
