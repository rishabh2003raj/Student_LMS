const {Course} = require('../models');

exports.getCourses = async (req,res) => {
    const courses = await Course.findAll();
    res.json(courses);
}

exports.createCourse = async (req,res) => {
    const {title, description, instructor} = req.body;
    const course = await Course.create({ title, description, instructor});
    res.status(201).json(course);
}

exports.updateCourse = async (req,res) => {
    const {id} = req.params;
    const {title,description,instructor} = req.body;

    const course = await Course.findByPk(id);
    if(!course) return res.status(404).json({message: "Course not found"});

    course.title = title;
    course.description = description;
    course.instructor = instructor;
    await course.save();

    res.json(course);
};

exports.deleteCourse = async (req,res) => {
    const {id} = req.params;
    await Course.destroy({where: {id} });
    res.json({message: "Course deleted"});
};