import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboardStats();
      setStats(response.data.stats);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-container">Loading dashboard...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (!stats) return <div className="error-container">No data available</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏨</div>
          <div className="stat-content">
            <h3>Total Hotels</h3>
            <p className="stat-number">{stats.totalHotels}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛏️</div>
          <div className="stat-content">
            <h3>Total Rooms</h3>
            <p className="stat-number">{stats.totalRooms}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Total Bookings</h3>
            <p className="stat-number">{stats.totalBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <h3>Confirmed Bookings</h3>
            <p className="stat-number">{stats.confirmedBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✗</div>
          <div className="stat-content">
            <h3>Cancelled Bookings</h3>
            <p className="stat-number">{stats.cancelledBookings}</p>
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-number">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <h3>Completed Bookings</h3>
            <p className="stat-number">{stats.completedBookings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
