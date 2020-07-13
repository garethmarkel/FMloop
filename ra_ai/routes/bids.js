/*
This is the API route that allows the React front-end to call bidController's
logic functions.
*/

var express = require('express');
var router = express.Router();
var bidController = require('../controllers/bidController.js');

router.post('/getBids', bidController.getBids);
router.post('/getProjectBid', bidController.getProjectBid);
router.post('/submitBid', bidController.submitBid);
router.post('/setContracted', bidController.setContracted);


module.exports = router;
