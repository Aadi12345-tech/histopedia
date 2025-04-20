import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, googleProvider } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import bcryptjs from 'bcryptjs';
import './UserLogin.css';

const UserLogin = () => {

  useEffect(()=> {
    setUsername("");
    setPassword("");
    setIncorrectP(0);
    setIncorrectU(0)
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectp, setIncorrectP] = useState(0);
  const [incorrectu, setIncorrectU] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  

  const fetchData = async (username, password) => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      if (!response.ok) {
        console.log("Network response was not ok");
      }
      const users = response.data;
      // console.log(users)
      
      const user = users.find((user) => user.username === username);
      // console.log(user)

      if(!user)
      {
        setIncorrectU(1);
      }

      const comparison = await bcryptjs.compare(password, user.password)
      setTimeout(() => { 
        if(comparison) {
          // setUser(user.id)
          // const histRes = await fetch("http://localhost:3000/history")
          // const hist = histRes.find((hist)=> hist.username = username)
          // setHistory(hist.id)
          // console.log(userId, historyId)
          setLoggedIn(true);
          
          navigate("/")
        } else {
          setIncorrectP(1);
          
          navigate("/user-login");
        }
      }, 1000);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  function onSubmit (username, password) {
    return async (e) => {
      e.preventDefault();
      setIncorrectP(0);
      setIncorrectU(0);
      setUsername(username);
      setPassword(password);
      await fetchData(username, password);
    };  

    
  }


  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();
  const { login, googleLogin, currentUser } = useAuth();
  
  // Get redirect URL from query parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect');
  
  // Get success message from location state (if coming from SignUp)
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  
  // Check if user is already logged in
  useEffect(() => {
    if (currentUser) {
      // If user is already logged in and there's a redirect path, navigate there
      if (redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [currentUser, navigate, redirectPath]);
  
  // Check for success message in location state
  useEffect(() => {
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      // Clear the location state
      window.history.replaceState({}, document.title);
      
      // Auto-dismiss success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setIncorrectP(0);
    setIncorrectU(0);
    console.log(formData)
  };


  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      const result = await auth.signInWithPopup(googleProvider);
      
      // Use the googleLogin function from AuthContext
      googleLogin(result.user);
      
      // Set success message
      setSuccessMessage('Login successful! Redirecting...');
      
      // Redirect after a short delay
      setTimeout(() => {
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          navigate('/');
        }
      }, 1000);
    } catch (error) {
      // Handle specific Firebase auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Login cancelled. Please try again.');
      } else {
        setErrorMessage(`Google login failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`user-login-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle">
        <button 
          className="theme-toggle-button"
          onClick={toggleTheme}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="login-header">
        <h2 className="login-title">User Login</h2>
        <p className="login-subtitle">Login to book tickets and access user services</p>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {loggedIn === true && <div className="success-message">Login successful!</div>}
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      {(incorrectu === 1 || incorrectp ===1 ) && <div className="error-message">Incorrect Credentials</div>}
      <div className="login-box">
        <form className="login-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="form-input-wrapper">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="form-input-wrapper">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-options">
            <div className="remember-option">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="checkbox-input"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="checkbox-label">
                Remember me
              </label>
            </div>

            <div className="forgot-password">
              <button type="button" className="forgot-password-link" disabled={isLoading}>
                Forgot your password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            onClick={onSubmit(formData.username, formData.password)}
            disabled={isLoading}
          >Sign in
          </button>

          <div className="divider">
            <span className="divider-text">Or continue with</span>
          </div>

          <button
            type="button"
            className="google-button"
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

          <div className="divider">
            <span className="divider-text">New user?</span>
          </div>

          

          <Link 
            to={redirectPath ? `/signup?redirect=${encodeURIComponent(redirectPath)}` : "/signup"} 
            className="signup-link"
          >
            Sign up here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserLogin; 