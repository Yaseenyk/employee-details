const express = require('express');
const authContoller = require('../controller/authController');
const router = express.Router();


router.post('/signup',authContoller.signUp);
router.post('/signin',authContoller.signIn);
router.post('/logout',authContoller.logout);

module.exports = router;