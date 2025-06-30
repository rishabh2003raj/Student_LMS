import { useEffect, useState } from 'react';
import api from '../services/api';
import './AdminPanel.css';

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const res = await api.get('/enrollments/admin');
      setEnrollments(res.data);
    };
    fetchEnrollments();
  }, []);

  return (
    <div className="admin-panel">
      <h3>Student Enrollments</h3>
      <ul className="course-list">
        {enrollments.map((enroll, index) => (
          <li key={index}>
            <strong>Student:</strong> {enroll.user.name} (ID: {enroll.user.id})<br />
            <strong>Course:</strong> {enroll.course.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminEnrollments;
