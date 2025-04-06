import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Show nothing while checking authentication status
  if (loading) {
    return <div className="loading-container">Checking authentication...</div>;
  }

  // Check if user is logged in
  if (!currentUser) {
    // Redirect to login page with the return URL
    return <Navigate to={`/user-login?redirect=${encodeURIComponent(location.pathname)}`} />;
  }

  // Check if admin route and user is not admin
  if (adminOnly && !isAdmin) {
    // Redirect unauthorized users to home
    return <Navigate to="/" />;
  }

  // User is authenticated and authorized
  return children;
};

export default ProtectedRoute; 