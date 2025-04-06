import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import './Guides.css';

const Guides = () => {
  const { monumentId } = useParams();
  const [selectedGuide, setSelectedGuide] = useState(null);

  // Guides data for monuments (in a real app, this would be fetched from an API)
  const redFortGuides = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      image: '/images/guide1.webp',
      languages: ['English', 'Hindi', 'Urdu'],
      experience: '12 years',
      specialization: 'Mughal Architecture and History',
      rating: 4.9,
      reviews: 357,
      bio: 'Rajesh is a history professor with extensive knowledge of Mughal architecture and Delhi\'s rich cultural heritage. His tours of the Red Fort explore not just the main attractions but also the lesser-known corners with fascinating stories.',
      availability: 'Daily (except Mondays)',
      price: '₹2000 for a 2-hour tour',
      contact: '+91 98765 43210',
      email: 'rajesh.kumar@delhiguides.com'
    },
    {
      id: 2,
      name: 'Priya Singh',
      image: '/images/guide2.jpg',
      languages: ['English', 'Hindi', 'French'],
      experience: '8 years',
      specialization: 'Art and Cultural History',
      rating: 4.7,
      reviews: 212,
      bio: 'Priya specializes in the artistic and cultural aspects of the monuments. Her Red Fort tours focus on the intricate artwork, the symbolism in the architecture, and the cultural significance of various sections of the fort.',
      availability: 'Weekends and holidays',
      price: '₹1800 for a 2-hour tour',
      contact: '+91 98765 43211',
      email: 'priya.singh@delhiguides.com'
    },
    {
      id: 3,
      name: 'Ahmed Khan',
      image: '/images/guide3.png',
      languages: ['English', 'Hindi', 'Arabic'],
      experience: '15 years',
      specialization: 'Islamic Architecture and Mughal Dynasty',
      rating: 4.8,
      reviews: 421,
      bio: 'Ahmed is known for his engaging storytelling that brings the Mughal era to life. His tours connect the architectural elements of the Red Fort with the broader historical and political context of the Mughal dynasty.',
      availability: 'Daily tours at 9 AM and 2 PM',
      price: '₹2200 for a 2-hour tour',
      contact: '+91 98765 43212',
      email: 'ahmed.khan@delhiguides.com'
    }
  ];

  const guidesData = {
    // Using Red Fort guides for all monuments
    'red-fort': {
      name: 'Red Fort',
      guides: redFortGuides
    },
    'taj-mahal': {
      name: 'Taj Mahal',
      guides: redFortGuides
    },
    'humayun-tomb': {
      name: 'Humayun\'s Tomb',
      guides: redFortGuides
    },
    'qutub-minar': {
      name: 'Qutub Minar',
      guides: redFortGuides
    },
    'india-gate': {
      name: 'India Gate',
      guides: redFortGuides
    },
    'agra-fort': {
      name: 'Agra Fort',
      guides: redFortGuides
    },
    'fatehpur-sikri': {
      name: 'Fatehpur Sikri',
      guides: redFortGuides
    },
    'itimad-ud-daulah': {
      name: 'Itimad-ud-Daulah',
      guides: redFortGuides
    },
    'hawa-mahal': {
      name: 'Hawa Mahal',
      guides: redFortGuides
    },
    'amber-fort': {
      name: 'Amber Fort',
      guides: redFortGuides
    },
    'city-palace': {
      name: 'City Palace',
      guides: redFortGuides
    },
    'jantar-mantar': {
      name: 'Jantar Mantar',
      guides: redFortGuides
    },
    // Kolkata monuments
    'victoriamemorial': {
      name: 'Victoria Memorial',
      guides: redFortGuides
    },
    'golkonda-fort': {
      name: 'Golkonda Fort',
      guides: redFortGuides
    },
    'howrahbridge': {
      name: 'Howrah Bridge',
      guides: redFortGuides
    },
    'hussain-sagar': {
      name: 'Hussain Sagar',
      guides: redFortGuides
    },
    // Using different IDs that might be passed
    'redfort': {
      name: 'Red Fort',
      guides: redFortGuides
    },
    'tajmahal': {
      name: 'Taj Mahal',
      guides: redFortGuides
    },
    'humayunstomb': {
      name: 'Humayun\'s Tomb',
      guides: redFortGuides
    },
    'qutubminar': {
      name: 'Qutub Minar',
      guides: redFortGuides
    },
    'indiagate': {
      name: 'India Gate',
      guides: redFortGuides
    },
    'agrafort': {
      name: 'Agra Fort',
      guides: redFortGuides
    },
    'fatehpursikri': {
      name: 'Fatehpur Sikri',
      guides: redFortGuides
    },
    'itimad': {
      name: 'Itimad-ud-Daulah',
      guides: redFortGuides
    },
    'hawamahal': {
      name: 'Hawa Mahal',
      guides: redFortGuides
    },
    'amberfort': {
      name: 'Amber Fort',
      guides: redFortGuides
    },
    'citypalace': {
      name: 'City Palace',
      guides: redFortGuides
    },
    'jantarmantar': {
      name: 'Jantar Mantar',
      guides: redFortGuides
    }
  };

  // Default data for unknown monuments
  const defaultData = {
    name: 'Unknown Monument',
    guides: [
      {
        id: 1,
        name: 'Tour Guide',
        image: 'https://via.placeholder.com/150',
        languages: ['English'],
        experience: 'Not specified',
        specialization: 'General Tours',
        rating: 0,
        reviews: 0,
        bio: 'Information about guides for this monument is not available.',
        availability: 'Not specified',
        price: 'Not specified',
        contact: 'Not available',
        email: 'Not available'
      }
    ]
  };

  // Get the guides data for the monument or use default
  const data = guidesData[monumentId] || defaultData;

  // Function to handle guide selection
  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide);
  };

  // Function to close guide detail view
  const handleCloseGuideDetail = () => {
    setSelectedGuide(null);
  };

  return (
    <div className="guides-container">
      <div className="guides-wrapper">
        <div className="back-link">
          <Link to={`/monument/${monumentId}`}>
            <span className="back-icon">←</span>
            Back to Monument
          </Link>
        </div>

        <h1 className="page-title">Local Guides: {data.name}</h1>
        <p className="page-description">
          Enhance your visit to {data.name} with the expertise of our certified local guides. They provide in-depth knowledge, historical context, and engaging stories about this magnificent monument.
        </p>

        {!selectedGuide ? (
          <div className="guides-grid">
            {data.guides.map(guide => (
              <div key={guide.id} className="guide-card" onClick={() => handleGuideSelect(guide)}>
                <div className="guide-image-container">
                  <LazyImage 
                    src={guide.image} 
                    alt={guide.name}
                    className="guide-image"
                    fallbackSrc="/images/guide2.jpg"
                  />
                  <div className="guide-rating">
                    <span className="star-icon">★</span>
                    <span className="rating-value">{guide.rating}</span>
                    <span className="reviews-count">({guide.reviews})</span>
                  </div>
                </div>
                
                <div className="guide-content">
                  <h2 className="guide-name">{guide.name}</h2>
                  
                  <div className="guide-specialization">
                    {guide.specialization}
                  </div>
                  
                  <div className="guide-details">
                    <div className="guide-languages">
                      <span className="detail-label">Languages:</span>
                      <span className="detail-value">{guide.languages.join(', ')}</span>
                    </div>
                    
                    <div className="guide-experience">
                      <span className="detail-label">Experience:</span>
                      <span className="detail-value">{guide.experience}</span>
                    </div>
                  </div>
                  
                  <div className="guide-price">
                    {guide.price}
                  </div>
                  
                  <button 
                    className="view-profile-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent opening the guide detail
                      // Navigate to guide booking page with guide data
                      window.location.href = `/monument/${monumentId}/book-guide?guideId=${guide.id}`;
                    }}
                  >
                    Book Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="guide-detail">
            <button className="close-button" onClick={handleCloseGuideDetail}>
              ← Back to all guides
            </button>
            
            <div className="guide-detail-content">
              <div className="guide-detail-header">
                <div className="guide-detail-image-container">
                  <LazyImage 
                    src={selectedGuide.image} 
                    alt={selectedGuide.name}
                    className="guide-detail-image"
                    fallbackSrc="/images/guide2.jpg"
                  />
                </div>
                
                <div className="guide-detail-info">
                  <h2 className="guide-detail-name">{selectedGuide.name}</h2>
                  
                  <div className="guide-detail-specialization">
                    {selectedGuide.specialization}
                  </div>
                  
                  <div className="guide-detail-rating">
                    <span className="star-icon">★</span>
                    <span className="rating-value">{selectedGuide.rating}</span>
                    <span className="reviews-count">({selectedGuide.reviews} reviews)</span>
                  </div>
                  
                  <div className="guide-detail-languages">
                    <span className="detail-label">Languages:</span>
                    <span className="detail-value">{selectedGuide.languages.join(', ')}</span>
                  </div>
                  
                  <div className="guide-detail-experience">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{selectedGuide.experience}</span>
                  </div>
                </div>
              </div>
              
              <div className="guide-detail-biography">
                <h3>About {selectedGuide.name}</h3>
                <p>{selectedGuide.bio}</p>
              </div>
              
              <div className="guide-detail-availability">
                <h3>Availability</h3>
                <p>{selectedGuide.availability}</p>
              </div>
              
              <div className="guide-detail-price">
                <h3>Tour Price</h3>
                <p>{selectedGuide.price}</p>
              </div>
              
              <div className="guide-detail-contact">
                <h3>Contact Information</h3>
                <p>Phone: {selectedGuide.contact}</p>
                <p>Email: {selectedGuide.email}</p>
              </div>
              
              <div className="guide-detail-actions">
                <button className="book-tour-button">
                  Book a Tour
                </button>
                <button className="contact-guide-button">
                  Contact Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guides; 