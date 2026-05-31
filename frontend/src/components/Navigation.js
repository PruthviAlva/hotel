import React from 'react';
import '../styles/Navigation.css';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🏨 HotelBook
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <>
                  <Link to="/admin/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <Link to="/admin/hotels" className="nav-link">
                    Manage Hotels
                  </Link>
                  <Link to="/admin/rooms" className="nav-link">
                    Manage Rooms
                  </Link>
                  <Link to="/admin/bookings" className="nav-link">
                    Bookings
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/bookings" className="nav-link">
                    My Bookings
                  </Link>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </>
              )}

              <div className="nav-user">
                <span className="nav-username">
                  {user?.firstName} {user?.lastName}
                </span>
                <button onClick={handleLogout} className="nav-logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link nav-register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
