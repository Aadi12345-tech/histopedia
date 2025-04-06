import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Events.css';

const Events = () => {
  const { monumentId } = useParams();
  const { isDarkMode } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Common Red Fort events to be used for all monuments
  const redFortEvents = [
    {
      id: 1,
      title: 'Independence Day Celebration',
      date: '15 August 2024',
      time: '7:00 AM - 10:00 AM',
      category: 'cultural',
      image: '/images/calender.jpg',
      description: 'The annual celebration of India\'s Independence Day, featuring the Prime Minister\'s address to the nation from the ramparts of the Red Fort.',
      ticketPrice: 'Free for all (Special passes required)',
      location: 'Main Ramparts, Red Fort',
      organizer: 'Government of India'
    },
    {
      id: 2,
      title: 'Sound and Light Show',
      date: 'Daily (except Mondays)',
      time: '6:00 PM - 7:00 PM',
      category: 'entertainment',
      image: '/images/guide.jpg',
      description: 'An immersive sound and light show that narrates the history of the Red Fort and Delhi through spectacular visual projections and narration.',
      ticketPrice: '₹150 for adults, ₹75 for children',
      location: 'Naubat Khana, Red Fort',
      organizer: 'Archaeological Survey of India'
    },
    {
      id: 3,
      title: 'Mughal Art Workshop',
      date: '20-22 June 2024',
      time: '10:00 AM - 4:00 PM',
      category: 'educational',
      image: '/images/guide1.webp',
      description: 'A three-day workshop on traditional Mughal miniature painting techniques, calligraphy, and design patterns found in the Red Fort.',
      ticketPrice: '₹1000 per person (Materials included)',
      location: 'Diwan-i-Khas, Red Fort',
      organizer: 'National Museum in collaboration with ASI'
    },
    {
      id: 4,
      title: 'Heritage Walk: Hidden Stories of Red Fort',
      date: 'Every Weekend',
      time: '9:00 AM - 11:00 AM',
      category: 'tour',
      image: '/images/guide2.jpg',
      description: 'A guided heritage walk exploring the lesser-known corners and stories of the Red Fort complex, conducted by expert historians.',
      ticketPrice: '₹500 per person',
      location: 'Meet at Lahori Gate',
      organizer: 'Delhi Heritage Walks'
    }
  ];

  // Events data for monuments (in a real app, this would be fetched from an API)
  const eventsData = {
    // Using Red Fort events for all monuments
    'red-fort': {
      name: 'Red Fort',
      events: redFortEvents
    },
    'taj-mahal': {
      name: 'Taj Mahal',
      events: redFortEvents
    },
    'humayun-tomb': {
      name: 'Humayun\'s Tomb',
      events: redFortEvents
    },
    'qutub-minar': {
      name: 'Qutub Minar',
      events: redFortEvents
    },
    'india-gate': {
      name: 'India Gate',
      events: redFortEvents
    },
    'agra-fort': {
      name: 'Agra Fort',
      events: redFortEvents
    },
    'fatehpur-sikri': {
      name: 'Fatehpur Sikri',
      events: redFortEvents
    },
    'itimad-ud-daulah': {
      name: 'Itimad-ud-Daulah',
      events: redFortEvents
    },
    'hawa-mahal': {
      name: 'Hawa Mahal',
      events: redFortEvents
    },
    'amber-fort': {
      name: 'Amber Fort',
      events: redFortEvents
    },
    'city-palace': {
      name: 'City Palace',
      events: redFortEvents
    },
    'jantar-mantar': {
      name: 'Jantar Mantar',
      events: redFortEvents
    },
    // Using different IDs that might be passed
    'redfort': {
      name: 'Red Fort',
      events: redFortEvents
    },
    'tajmahal': {
      name: 'Taj Mahal',
      events: redFortEvents
    },
    'humayunstomb': {
      name: 'Humayun\'s Tomb',
      events: redFortEvents
    },
    'qutubminar': {
      name: 'Qutub Minar',
      events: redFortEvents
    },
    'indiagate': {
      name: 'India Gate',
      events: redFortEvents
    },
    'agrafort': {
      name: 'Agra Fort',
      events: redFortEvents
    },
    'fatehpursikri': {
      name: 'Fatehpur Sikri',
      events: redFortEvents
    },
    'itimad': {
      name: 'Itimad-ud-Daulah',
      events: redFortEvents
    },
    'hawamahal': {
      name: 'Hawa Mahal',
      events: redFortEvents
    },
    'amberfort': {
      name: 'Amber Fort',
      events: redFortEvents
    },
    'citypalace': {
      name: 'City Palace',
      events: redFortEvents
    },
    'jantarmantar': {
      name: 'Jantar Mantar',
      events: redFortEvents
    }
  };

  // Get monument data or use a default
  const monumentData = eventsData[monumentId] || {
    name: 'This Monument',
    events: redFortEvents
  };

  // Filter events based on selected category
  const filteredEvents = selectedFilter === 'all' 
    ? monumentData.events 
    : monumentData.events.filter(event => event.category === selectedFilter);

  // Handle filter selection
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className={`events-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="events-header">
        <h1 className="events-title">Upcoming Events</h1>
        <p className="events-subtitle">
          Discover cultural programs, performances, and special exhibitions related to this monument.
        </p>
      </div>

      <div className="event-filters">
        <button 
          className={`filter-button ${selectedFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Events
        </button>
        <button 
          className={`filter-button ${selectedFilter === 'cultural' ? 'active' : ''}`}
          onClick={() => handleFilterChange('cultural')}
        >
          Cultural
        </button>
        <button 
          className={`filter-button ${selectedFilter === 'entertainment' ? 'active' : ''}`}
          onClick={() => handleFilterChange('entertainment')}
        >
          Entertainment
        </button>
        <button 
          className={`filter-button ${selectedFilter === 'educational' ? 'active' : ''}`}
          onClick={() => handleFilterChange('educational')}
        >
          Educational
        </button>
        <button 
          className={`filter-button ${selectedFilter === 'tour' ? 'active' : ''}`}
          onClick={() => handleFilterChange('tour')}
        >
          Tours
        </button>
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image-container">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="event-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200?text=Event+Image";
                  }}
                />
                <span className={`event-category ${event.category}`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </div>

              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>

                <div className="event-info">
                  <div className="event-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="event-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                  </div>

                  <div className="event-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="event-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.time}</span>
                  </div>

                  <div className="event-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="event-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="event-description">
                  {event.description.length > 150 
                    ? `${event.description.substring(0, 150)}...` 
                    : event.description
                  }
                </p>

                <div className="event-footer">
                  <div className="event-price">
                    <span className="price-label">Ticket:</span>
                    <span className="price-value">{event.ticketPrice}</span>
                  </div>
                  <div className="event-organizer">
                    <span className="organizer-label">By:</span>
                    <span className="organizer-value">{event.organizer}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <p>No events found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events; 