import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Histopedia</h3>
          <p className="footer-description">
            Exploring India's rich heritage through its magnificent monuments.
            Discover history, plan your visits, and learn about our cultural legacy.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/city/delhi">Delhi</Link></li>
            <li><Link to="/city/agra">Agra</Link></li>
            <li><Link to="/city/jaipur">Jaipur</Link></li>
            <li><Link to="/city/kolkata">Kolkata</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Connect</h3>
          <ul className="footer-links">
            <li><Link to="/user-login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <div className="social-icon facebook">
                <span className="social-icon-symbol">f</span>
              </div>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <div className="social-icon twitter">
                <span className="social-icon-symbol">t</span>
              </div>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="social-icon instagram">
                <span className="social-icon-symbol">i</span>
              </div>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <div className="social-icon youtube">
                <span className="social-icon-symbol">y</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} Histopedia. All Rights Reserved.
        </p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 