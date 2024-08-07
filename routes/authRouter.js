const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);

router.route('/signin').post(authController.login);
router.route('/signout').get(authController.authenticate,authController.logout);

module.exports = router;