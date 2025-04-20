import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, googleProvider } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { login, googleLogin, currentUser } = useAuth();
  
  // Get redirect URL from query parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Check if user is already logged in
  useEffect(() => {
    if (currentUser) {
      // If user is already logged in and there's a redirect path, navigate there
      if (redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [currentUser, navigate, redirectPath]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {

        const user =  await fetch("http://localhost:5000/users", {
          method: "POST",  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.fullName,
            password: formData.password,
          }),
        });
        if(!user.ok) {
          console.log("Error posting data")
        }
        // Login the user with context
        login({
          username: formData.fullName,
          email: formData.email,
        });
        
        // If there's a redirect path, go there directly, otherwise go to login
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          // Redirect to login page
          navigate('/user-login', { 
            state: { 
              message: 'Account created successfully! Please login with your credentials.' 
            } 
          });
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const handleGoogleSignUp = async () => {
    setErrorMessage('');
    setIsSubmitting(true);
    
    try {
      // Sign in with Google popup
      const result = await auth.signInWithPopup(googleProvider);
      
      // Use the googleLogin function from AuthContext
      googleLogin(result.user);
      
      // Redirect to the appropriate page
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate('/');
      }
    } catch (error) {
      // Handle specific Firebase auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Sign up cancelled. Please try again.');
      } else {
        setErrorMessage(`Google sign up failed: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={`signup-container ${isDarkMode ? 'dark-mode' : ''}`} style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '3rem 1rem', 
      backgroundColor: isDarkMode ? '#121212' : '#f8f9fa',
      color: isDarkMode ? '#e2e8f0' : 'inherit'
    }}>
      <div className="theme-toggle">
        <button 
          className="theme-toggle-button"
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            color: isDarkMode ? '#ffffff' : '#000000'
          }}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
      
      <div className="signup-header" style={{ 
        textAlign: 'center', 
        maxWidth: '28rem', 
        margin: '0 auto' 
      }}>
        <h1 className="signup-title" style={{ 
          color: isDarkMode ? '#ffffff' : '#333', 
          fontWeight: '800',
          textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.1)' : 'none'
        }}>Create Your Account</h1>
        <p className="signup-subtitle" style={{ color: isDarkMode ? '#e2e8f0' : '#6b7280' }}>Join Histopedia to explore historical monuments and book guided tours</p>
      </div>
      
      {errorMessage && (
        <div className="error-message global-error" style={{
          backgroundColor: isDarkMode ? '#461B18' : '#fee2e2',
          borderColor: isDarkMode ? '#DC2626' : '#ef4444',
          color: isDarkMode ? '#FECACA' : '#b91c1c'
        }}>
          {errorMessage}
        </div>
      )}
      
      <div className="signup-box" style={{ marginTop: '2rem', maxWidth: '28rem', width: '100%' }}>
        <form className="signup-form" onSubmit={handleSubmit} style={{ 
          padding: '2rem', 
          boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)', 
          borderRadius: '0.5rem',
          backgroundColor: isDarkMode ? '#1e1e1e' : 'white',
          color: isDarkMode ? '#e2e8f0' : 'inherit',
          border: isDarkMode ? '1px solid #333' : 'none'
        }}>
          <div className="form-group">
            <label htmlFor="fullName" style={{ color: isDarkMode ? '#e2e8f0' : '#4b5563', fontWeight: '500' }}>Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              style={{ 
                backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
                color: isDarkMode ? '#e2e8f0' : 'inherit',
                borderColor: isDarkMode ? '#3d3d3d' : '#d1d5db',
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                width: '100%',
                fontSize: '0.875rem'
              }}
            />
            {errors.fullName && <div className="error-message" style={{ color: isDarkMode ? '#F87171' : '#ef4444' }}>{errors.fullName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" style={{ color: isDarkMode ? '#e2e8f0' : '#4b5563', fontWeight: '500' }}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isSubmitting}
              style={{ 
                backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
                color: isDarkMode ? '#e2e8f0' : 'inherit',
                borderColor: isDarkMode ? '#3d3d3d' : '#d1d5db',
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                width: '100%',
                fontSize: '0.875rem'
              }}
            />
            {errors.email && <div className="error-message" style={{ color: isDarkMode ? '#F87171' : '#ef4444' }}>{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" style={{ color: isDarkMode ? '#e2e8f0' : '#4b5563', fontWeight: '500' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Create a password"
              disabled={isSubmitting}
              style={{ 
                backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
                color: isDarkMode ? '#e2e8f0' : 'inherit',
                borderColor: isDarkMode ? '#3d3d3d' : '#d1d5db',
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                width: '100%',
                fontSize: '0.875rem',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            />
            {errors.password && <div className="error-message" style={{ color: isDarkMode ? '#F87171' : '#ef4444' }}>{errors.password}</div>}
            <div className="password-hint" style={{ color: isDarkMode ? '#a0aec0' : '#6b7280', fontSize: '0.8rem', marginTop: '4px' }}>Password must be at least 8 characters long</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" style={{ color: isDarkMode ? '#e2e8f0' : '#4b5563', fontWeight: '500' }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
              disabled={isSubmitting}
              style={{ 
                backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
                color: isDarkMode ? '#e2e8f0' : 'inherit',
                borderColor: isDarkMode ? '#3d3d3d' : '#d1d5db',
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                width: '100%',
                fontSize: '0.875rem',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            />
            {errors.confirmPassword && <div className="error-message" style={{ color: isDarkMode ? '#F87171' : '#ef4444' }}>{errors.confirmPassword}</div>}
          </div>
          
          <div className="checkbox-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                accentColor: isDarkMode ? '#60a5fa' : '#4361ee',
                width: '1rem',
                height: '1rem'
              }}
            />
            <label htmlFor="agreeTerms" style={{ color: isDarkMode ? '#e2e8f0' : '#4b5563', margin: 0 }}>
              I agree to the <Link to="/terms" className="terms-link" style={{ color: isDarkMode ? '#60a5fa' : '#4361ee', textDecoration: 'none', fontWeight: '500' }}>Terms and Conditions</Link>
            </label>
          </div>
          {errors.agreeTerms && <div className="error-message" style={{ color: isDarkMode ? '#F87171' : '#ef4444', marginTop: '4px' }}>{errors.agreeTerms}</div>}
          
          <button 
          type="submit"
          id="submitButton"
          class = "submit-button"
          name="submit"
          onClick={handleSubmit}>Sign up</button>

          <div className="divider" style={{
            position: 'relative',
            margin: '1.5rem 0',
            textAlign: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: isDarkMode ? '#3d3d3d' : '#e5e7eb'
            }}></div>
            <span style={{ 
              backgroundColor: isDarkMode ? '#1e1e1e' : 'white', 
              color: isDarkMode ? '#a0aec0' : '#6b7280',
              position: 'relative',
              zIndex: 1,
              padding: '0 0.5rem'
            }}>sign up with</span>
          </div>
          
          <button 
            type="button" 
            className="google-signup-button"
            onClick={handleGoogleSignUp}
            disabled={isSubmitting}
            style={{
              backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
              color: isDarkMode ? '#e2e8f0' : '#374151',
              border: `1px solid ${isDarkMode ? '#3d3d3d' : '#d1d5db'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem 1rem',
              borderRadius: '0.375rem',
              width: '100%',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'all 0.2s ease',
              marginTop: '1rem',
              boxShadow: isDarkMode ? '0 2px 5px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#383838' : '#f8f9fa';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#2d2d2d' : 'white';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <img
              src="/images/google.png"
              alt="Google logo"
              className="google-icon"
              style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }}
            />
            Sign up with Google
          </button>
        </form>
        
        <div className="already-have-account" style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          color: isDarkMode ? '#a0aec0' : '#6b7280' 
        }}>
          Already have an account? <Link to={redirectPath ? `/user-login?redirect=${encodeURIComponent(redirectPath)}` : "/user-login"} className="login-link" style={{ color: isDarkMode ? '#60a5fa' : '#4361ee', fontWeight: 500 }}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 