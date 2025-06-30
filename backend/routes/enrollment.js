const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const enrollmentController = require('../controllers/enrollmentController');

router.get('/', auth, enrollmentController.getMyCourses);
router.post('/', auth, enrollmentController.enrollInCourse);

// 👇 New route for admin
router.get('/admin', auth, role(['admin']), enrollmentController.getAllEnrollments);

module.exports = router;
