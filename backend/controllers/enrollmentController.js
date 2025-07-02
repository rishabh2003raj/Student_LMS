const { Enrollment, Course, User } = require('../models');


exports.getMyCourses = async (req, res) => {
  const enrollments = await Enrollment.findAll({
    where: { userId: req.user.id },
    include: [{ model: Course, as: 'course' }]
  });
  res.json(enrollments);
};


exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.body;
  const enrollment = await Enrollment.create({ userId: req.user.id, courseId });
  res.status(201).json(enrollment);
};

exports.getAllEnrollments = async (req, res) => {
  const enrollments = await Enrollment.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'name'] },
      { model: Course, as: 'course', attributes: ['title'] }
    ]
  });
  res.json(enrollments);
};

