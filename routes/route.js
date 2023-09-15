const express = require('express');
const employeeController = require('../controller/employeeController')
const router = express.Router();

router.post('/add',employeeController.addEmployee);

module.exports = router;