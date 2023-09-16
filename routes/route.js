const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
// const adminController = require('../controllers/adminController');

// Route for listing employees
router.get('/admin', employeeController.addEmployee);

// Route for updating an employee
router.post('/update', employeeController.updateEmployee);

module.exports = router;
