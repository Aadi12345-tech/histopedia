import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { darkMode } = useTheme();

  return (
    <div className={`admin-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {currentUser?.username || 'Admin'}!</p>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h3>User Management</h3>
          <p>Manage user accounts and permissions</p>
          <button className="admin-button">Manage Users</button>
        </div>

        <div className="admin-card">
          <h3>Monument Data</h3>
          <p>Add or edit monument information</p>
          <button className="admin-button">Edit Monuments</button>
        </div>

        <div className="admin-card">
          <h3>Guide Management</h3>
          <p>Approve guides and manage bookings</p>
          <button className="admin-button">Manage Guides</button>
        </div>

        <div className="admin-card">
          <h3>Events</h3>
          <p>Create and manage events</p>
          <button className="admin-button">Manage Events</button>
        </div>

        <div className="admin-card">
          <h3>Analytics</h3>
          <p>View site statistics and user behavior</p>
          <button className="admin-button">View Analytics</button>
        </div>

        <div className="admin-card">
          <h3>System Settings</h3>
          <p>Configure system parameters</p>
          <button className="admin-button">Settings</button>
        </div>
      </div>

      <div className="admin-logout">
        <button 
          className="logout-button"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard; 