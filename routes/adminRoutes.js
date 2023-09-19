const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/dashboard',adminController.adminPage);
router.post('/delete/:id',adminController.deleteEmployee);
router.post('/update/:id',adminController.updateEmployee);
router.post('/performance/:id',adminController.showPerformance);
router.post('/addPerformance',adminController.addPerformance);
router.post('/assignEmployee',adminController.assignEmployee);

module.exports = router;