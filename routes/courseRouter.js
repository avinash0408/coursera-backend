const express = require('express');
const authController = require('../controllers/authController');
const courseController = require('../controllers/courseController');

const router  = express.Router();

router.route('/home').get(courseController.getAllCourses);
router.route('/').post(authController.authenticate,courseController.addCourse);
router.route('/:courseId').post(authController.authenticate,courseController.purchaseCourse)

module.exports = router;