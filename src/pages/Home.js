import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // We'll create this CSS file next

const Home = () => {
  const cities = [
    {
      id: 1,
      name: 'Delhi',
      image: 'https://www.holidify.com/images/bgImages/DELHI.jpg',
      monuments: ['Red Fort', 'Qutub Minar', 'India Gate', 'Humayun\'s Tomb']
    },
    {
      id: 2,
      name: 'Agra',
      image: 'https://www.holidify.com/images/bgImages/AGRA.jpg',
      monuments: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Itimad-ud-Daulah']
    },
    {
      id: 3,
      name: 'Jaipur',
      image: 'https://www.holidify.com/images/bgImages/JAIPUR.jpg',
      monuments: ['Hawa Mahal', 'Amber Fort', 'City Palace', 'Jantar Mantar']
    },
    {
      id: 4,
      name: 'Kolkata',
      image: '/images/howrahbridge.jpg',
      monuments: ['Victoria Memorial', 'Golkonda Fort', 'Howrah Bridge', 'Hussain Sagar']
    }
  ];

  return (
    <div className="home-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1 className="banner-title">
          <span className="banner-title-gradient">Welcome to HISTOPEDIA</span>
        </h1>
        <p className="banner-text">
          Discover the rich history and cultural heritage of India through its magnificent monuments.
          Explore ancient structures, learn about their historical significance, and plan your visit
          to these architectural marvels that have stood the test of time.
        </p>
      </div>

      {/* City Cards Section */}
      <h2 className="section-title">Explore Historic Cities</h2>
      <div className="city-grid">
        {cities.map((city) => (
          <Link key={city.id} to={`/city/${city.name.toLowerCase()}`} className="city-card-link">
            <div className="city-card">
              <div className="city-image-container">
                <img
                  src={city.image}
                  alt={city.name}
                  className="city-image"
                />
              </div>
              <div className="city-card-content">
                <h3 className="city-name">{city.name}</h3>
                <p className="city-description">
                  Explore the historical monuments of {city.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 