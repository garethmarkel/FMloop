var express = require("express");
var router = express.Router();
var threadController = require('../controllers/threadController.js');

router.post('/getMessages', threadController.getMessages);
router.post('/writeMessage', threadController.writeMessage);

module.exports = router;
