import { getUser } from '../utils';
import AdminPanel from './AdminPanel';
import AdminEnrollments from './AdminEnrollments';
import CourseList from './CourseList';
import './Dashboard.css';

const Dashboard = () => {
  const user = getUser();

  return (
    <div className="dashboard">
      <h2 className='dashboard-heading'>Welcome {user?.name} ({user?.role})</h2>
      {user?.role === 'admin' ? (
        <>
          <AdminPanel />
          <AdminEnrollments />
        </>
      ) : (
        <CourseList />
      )}
    </div>
  );
};

export default Dashboard;
