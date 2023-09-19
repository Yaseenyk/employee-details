const express = require('express');
const employeeController = require('../controller/employeeController');
const router = express.Router();

router.get('/dashboard',employeeController.dasboardPage);
router.post('/feedBack',employeeController.feedBack);


module.exports = router;