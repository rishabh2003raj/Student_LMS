import { useState, useEffect } from 'react';
import api from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', instructor: '' });

  const fetchCourses = async () => {
    const res = await api.get('/courses');
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/courses', form);
    setForm({ title: '', description: '', instructor: '' });
    fetchCourses();
  };

  const handleDelete = async (id) => {
    await api.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="admin-panel">
      <h3>Admin - Manage Courses</h3>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} value={form.title} required />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} required />
        <input name="instructor" placeholder="Instructor" onChange={handleChange} value={form.instructor} required />
        <button type="submit">Add Course</button>
      </form>

      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.title}</strong> - {course.instructor}
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
