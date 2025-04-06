import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import './NavbarUpdate.css'; // Import the updated styles

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { currentUser, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close menus when location changes
  useEffect(() => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location]);

  // Handle click outside profile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileMenu = document.getElementById('profile-menu');
      const profileButton = document.getElementById('profile-button');
      
      if (
        profileMenuOpen && 
        profileMenu && 
        !profileMenu.contains(event.target) && 
        profileButton && 
        !profileButton.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuOpen]);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-row">
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <div className="logo-container">
                <img
                  className="logo-image"
                  src="/images/logo.jpg"
                  alt="Histopedia Logo"
                />
                <div className="logo-glow"></div>
              </div>
              <span className="logo-text">
                <span className="logo-text-highlight">HISTO</span>PEDIA
              </span>
            </Link>
          </div>
          
          <div className="navbar-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`menu-bar ${menuOpen ? 'animate' : ''}`}></div>
            <div className={`menu-bar ${menuOpen ? 'animate' : ''}`}></div>
            <div className={`menu-bar ${menuOpen ? 'animate' : ''}`}></div>
          </div>

          <div className={`navbar-nav ${menuOpen ? 'show' : ''}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            {isAdmin && (
              <Link to="/admin/dashboard" className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}>
                Admin Dashboard
              </Link>
            )}
          </div>
          
          <div className="navbar-actions">
            <button 
              onClick={toggleTheme} 
              className={`theme-toggle-button ${darkMode ? 'dark' : 'light'}`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="toggle-icon">{darkMode ? "☀️" : "🌙"}</span>
              <span className="toggle-background"></span>
            </button>
            
            {currentUser ? (
              <div className="profile-dropdown">
                <button 
                  id="profile-button"
                  className="profile-button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  {currentUser.profilePic ? (
                    <img 
                      src={currentUser.profilePic} 
                      alt={currentUser.username} 
                      className="profile-image" 
                    />
                  ) : (
                    <div className="profile-initials">
                      {currentUser.username.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <span className="profile-name">{currentUser.username}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                
                {profileMenuOpen && (
                  <div id="profile-menu" className="profile-menu">
                    <div className="profile-header">
                      <div className="profile-info">
                        <div className="profile-name-large">{currentUser.username}</div>
                        <div className="profile-email">{currentUser.email}</div>
                      </div>
                    </div>
                    <div className="profile-menu-items">
                      <Link to="/profile" className="profile-menu-item" onClick={() => setProfileMenuOpen(false)}>
                        My Profile
                      </Link>
                      <Link to="/bookings" className="profile-menu-item" onClick={() => setProfileMenuOpen(false)}>
                        My Bookings
                      </Link>
                      {isAdmin && (
                        <Link to="/admin/dashboard" className="profile-menu-item" onClick={() => setProfileMenuOpen(false)}>
                          Admin Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout} className="profile-menu-item logout-item">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons" style={{ display: 'flex !important', flexDirection: 'row !important', alignItems: 'center !important', gap: '0.75rem !important' }}>
                <Link to="/user-login" className="login-button" style={{ display: 'inline-flex !important', padding: '0.5rem 1rem !important', height: '2.25rem !important', alignItems: 'center !important' }}>
                  <span className="button-text">Login</span>
                </Link>
                <Link to="/signup" className="signup-button" style={{ display: 'inline-flex !important', padding: '0.5rem 1rem !important', height: '2.25rem !important', alignItems: 'center !important' }}>
                  <span className="button-text">Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 