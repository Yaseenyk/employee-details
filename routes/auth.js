const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controller/autnController');

router.post('/signup',authController.signup);
router.post('/login', passport.authenticate('local', { session: false }),authController.login);

module.exports = router;