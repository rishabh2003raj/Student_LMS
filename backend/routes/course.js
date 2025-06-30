const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const controller = require('../controllers/courseController');

router.get('/',auth,controller.getCourses);
router.post('/',auth,role(['admin']),controller.createCourse);
router.put('/:id',auth,role(['admin']),controller.updateCourse);
router.delete('/:id',auth,role(['admin']),controller.deleteCourse);

module.exports = router;