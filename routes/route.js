const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const adminController = require('../controller/adminController');

// Route for listing employees
router.get('/admin', employeeController.addEmployee);

// Route for updating an employee
router.post('/update', employeeController.updateEmployee);

// Route for viewing employee performance
router.get('/admin', adminController.viewEmployeePerformance);

// Route for adding a performance review
router.post('/add-performance-review', adminController.addPerformanceReview);

// Route for updating a performance review
router.post('/update-performance-review', adminController.updatePerformanceReview);

router.get('/api/employee/:employeeId/performance-review', adminController.getPerformanceReviews);

module.exports = router;





