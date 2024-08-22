const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/mycourses').get(authController.authenticate,userController.getUserPurchasedCourses);

module.exports = router;
