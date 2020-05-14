var express = require("express");
var router = express.Router();
var threadController = require('../controllers/threadController.js');

router.post('/getMessages', threadController.getMessages);

module.exports = router;
