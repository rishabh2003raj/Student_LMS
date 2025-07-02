const {Course} = require('../models');

exports.getCourses = async (req,res) => {
    const courses = await Course.findAll();
    res.json(courses);
}

exports.createCourse = async (req,res) => {
    const {title, description, instructor} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const course = await Course.create({ title, description, instructor,image});
    res.status(201).json(course);
}

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.title = title;
    course.description = description;
    course.instructor = instructor;

    if (req.file) {
      course.image = `/uploads/${req.file.filename}`;
    }

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
};


exports.deleteCourse = async (req,res) => {
    const {id} = req.params;
    await Course.destroy({where: {id} });
    res.json({message: "Course deleted"});
};