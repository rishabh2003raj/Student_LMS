import { useState, useEffect } from 'react';
import api from '../services/api';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    api.get('/courses').then((res) => setCourses(res.data));
    api.get('/enrollments').then((res) => setEnrolled(res.data.map((e) => e.courseId)));
  }, []);

  const enroll = async (courseId) => {
    await api.post('/enrollments', { courseId });
    setEnrolled([...enrolled, courseId]);
  };

  return (
    <div className="course-list">
      <h3>Available Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id} className="course-item">
            <div>
              <strong>{course.title}</strong> - {course.instructor}
            </div>
            {!enrolled.includes(course.id) && (
              <button onClick={() => enroll(course.id)} className="enroll-btn">Enroll</button>
            )}
            {enrolled.includes(course.id) && <span className="enrolled">✅ Enrolled</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
