var express = require('express');
var router = express.Router();
var projectController = require('../controllers/projectController.js');

router.post('/create', projectController.createProject);
router.post('/getProject', projectController.getProject);
router.post('/getUserProjects', projectController.getUserProjects);
router.post('/getAvailableProjects', projectController.getAvailableProjects);

module.exports = router;
