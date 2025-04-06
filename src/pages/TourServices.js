import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './TourServices.css';

const TourServices = () => {
  const { monumentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [monument, setMonument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching monument data for ID:', monumentId);
    // Get monument data from location state
    const monumentData = location.state?.monument;
    
    if (monumentData) {
      setMonument(monumentData);
      setLoading(false);
    } else {
      // If no data in location state, try to fetch from API
      const fetchMonument = async () => {
        try {
          const response = await fetch(`/api/monuments/${monumentId}`);
          if (!response.ok) {
            throw new Error('Monument not found');
          }
          const data = await response.json();
          setMonument(data);
        } catch (error) {
          console.error('Error fetching monument:', error);
          setError(error.message);
          navigate('/monuments');
        } finally {
          setLoading(false);
        }
      };

      fetchMonument();
    }
  }, [monumentId, navigate, location.state]);

  if (loading) {
    return (
      <div className={`tour-services-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`tour-services-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!monument) {
    return (
      <div className={`tour-services-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="error">Monument not found</div>
      </div>
    );
  }

  return (
    <div className={`tour-services-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div 
        className="tour-services-hero"
        style={{ backgroundImage: `url(${monument.image})` }}
      >
        <div className="tour-services-hero-content">
          <h1>{monument.name} Tour Services</h1>
          <p>Discover the rich history and cultural heritage with our expert-guided tours</p>
        </div>
      </div>
      
      <div className="tour-services-content">
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🎯</div>
            <h3>Guided Tours</h3>
            <p>Expert guides provide detailed insights into the monument's history and significance.</p>
            <button onClick={() => navigate(`/monument/${monumentId}/guides`)}>
              Book a Guide
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon">🎫</div>
            <h3>Ticket Booking</h3>
            <p>Skip the long queues with our convenient online ticket booking service.</p>
            <button onClick={() => navigate(`/monument/${monumentId}/book-ticket`)}>
              Book Tickets
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon">🎧</div>
            <h3>Audio Guides</h3>
            <p>Self-guided audio tours available in multiple languages for a personalized experience.</p>
            <button onClick={() => navigate(`/monument/${monumentId}/audio-guides`)}>
              Get Audio Guide
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon">📱</div>
            <h3>Digital Guide</h3>
            <p>Interactive mobile app with AR features and detailed historical information.</p>
            <button onClick={() => navigate(`/monument/${monumentId}/digital-guide`)}>
              Download App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourServices; 