import { Link, useNavigate } from 'react-router-dom';
import { removeToken, removeUser, getUser } from '../utils';
import './Navbar.css'; // ⬅️ Don't forget to import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">LMS</div>
      <ul className="navbar__links">
        {!user && <li><Link to="/register">Register</Link></li>}
        {!user && <li><Link to="/login">Login</Link></li>}
        {user && <li><Link to="/dashboard">Dashboard</Link></li>}
        {user && <li><button onClick={handleLogout}>Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
