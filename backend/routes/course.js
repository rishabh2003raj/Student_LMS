const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const role = require('../middleware/role');
const upload = require('../middleware/multer'); // ✅ import multer config
const controller = require('../controllers/courseController');


router.get('/', auth, controller.getCourses);
router.post(  '/', auth, role(['admin']), upload.single('image'),controller.createCourse);
router.put('/:id', auth, role(['admin']), upload.single('image'), controller.updateCourse);
router.delete('/:id', auth, role(['admin']), controller.deleteCourse);

module.exports = router;
