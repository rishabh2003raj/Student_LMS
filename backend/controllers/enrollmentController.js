const { Enrollment, Course, User } = require('../models');

// existing student course fetch
exports.getMyCourses = async (req, res) => {
  const enrollments = await Enrollment.findAll({
    where: { userId: req.user.id },
    include: [{ model: Course, as: 'course' }]
  });
  res.json(enrollments);
};

// student enroll
exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.body;
  const enrollment = await Enrollment.create({ userId: req.user.id, courseId });
  res.status(201).json(enrollment);
};

// 👇 new: for admin to view all student enrollments
exports.getAllEnrollments = async (req, res) => {
  const enrollments = await Enrollment.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'name'] },
      { model: Course, as: 'course', attributes: ['title'] }
    ]
  });
  res.json(enrollments);
};

