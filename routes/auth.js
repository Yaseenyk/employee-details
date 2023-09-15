const express = require('express');
const router = express.Router();
const authController = require('../controller/autnController');

router.post('/signup',authController.signup);
router.post('/login',authController.login);

module.exports = router;