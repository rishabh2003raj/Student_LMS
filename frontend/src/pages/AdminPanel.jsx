import { useState, useEffect } from 'react';
import api from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    instructor: '',
    image: null,
  });
  const [editingId, setEditingId] = useState(null); // ✅ track which course is being updated

  const fetchCourses = async () => {
    const res = await api.get('/courses');
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] }); // 👈 handle file input
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('instructor', form.instructor);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      if (editingId) {
        // ✅ Update course
        await api.put(`/courses/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // ✅ Create new course
        await api.post('/courses', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setForm({ title: '', description: '', instructor: '', image: null });
      setEditingId(null);
      fetchCourses();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (course) => {
    setForm({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      image: null, // don't load old image into input
    });
    setEditingId(course.id); // set id to trigger PUT
  };

  const handleDelete = async (id) => {
    await api.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="admin-panel">
      <h3>Admin - Manage Courses</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="title" placeholder="Title" onChange={handleChange} value={form.title} required />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} required />
        <input name="instructor" placeholder="Instructor" onChange={handleChange} value={form.instructor} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        <button type="submit">{editingId ? 'Update Course' : 'Add Course'}</button>
      </form>

      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id}>
            <img
              src={`http://localhost:5000${course.image}`}
              alt={course.title}
              width="120"
              height="80"
              style={{ objectFit: 'cover' }}
            />
            <strong>{course.title}</strong> - {course.instructor}
            <br />
            <button onClick={() => handleEdit(course)}>Edit</button>
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
