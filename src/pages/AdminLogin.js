import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, googleLogin, currentUser, isAdmin } = useAuth();
  const { darkMode } = useTheme();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (currentUser && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [currentUser, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      // For demo purposes - in a real app, validate against a backend
      // These would be admin credentials
      if (formData.username !== 'admin') {
        throw new Error('Invalid admin credentials');
      }
      
      if (formData.password !== 'admin123') {
        throw new Error('Invalid admin credentials');
      }
      
      // Login as admin
      login({
        username: formData.username,
        email: 'admin@histopedia.com',
      }, true); // true flag for admin
      
      // Redirect to admin dashboard
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
      
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      // Sign in with Google popup
      const result = await auth.signInWithPopup(googleProvider);
      
      // For demo purposes - check if this Google account is an admin
      // In a real app, you would verify against your database
      if (result.user.email === 'admin@histopedia.com') {
        // Login as admin
        googleLogin({
          ...result.user,
          role: 'admin' // This would be stored in your database in a real app
        });
        
        // Redirect to admin dashboard
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        throw new Error('This Google account does not have admin privileges');
      }
    } catch (error) {
      // Handle specific Firebase auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Login cancelled. Please try again.');
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`admin-login-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="login-card">
        <div className="login-header">
          <img 
            src="/images/logo.jpg" 
            alt="Histopedia Logo" 
            className="login-logo" 
          />
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">Access the administrative dashboard</p>
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <i className="fa fa-user icon"></i>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="fa fa-lock icon"></i>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-actions">
            <div className="remember-me">
              <input 
                type="checkbox" 
                id="remember" 
                name="remember" 
                checked={formData.remember}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button 
              type="button" 
              className="forgot-password"
              onClick={() => navigate('/forgot-password')}
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <button 
            type="button" 
            className="google-login"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <img 
              src="/images/google.png" 
              alt="Google logo" 
              className="google-icon" 
            />
            Sign in with Google
          </button>
        </form>

        <div className="login-footer">
          <button 
            onClick={() => navigate('/')} 
            className="back-to-home"
            disabled={isLoading}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 