const express = require('express');
const employeeController = require('../controller/employeeController');
const adminController = require('../controller/adminController');
const router = express.Router();

router.get('/admin',employeeController.addEmployee);
router.get('/employee',adminController.viewEmployee);
// router.post('/addEmployee', employeeController.addEmployeeHere);
module.exports = router;