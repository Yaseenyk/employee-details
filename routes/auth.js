const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controller/autnController');

router.post('/signup',authController.signup);
router.post('/login', passport.authenticate('local', { session: false }),authController.login);
router.get('/signin',authController.signin);
router.get('/logout',authController.logout);
router.post('/delete',authController.deleteEmployee);
router.post('/addEmployee',authController.addEmployee);
module.exports = router;