import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './GuideBooking.css';

const GuideBooking = () => {
  const { monumentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [guideData, setGuideData] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    timeSlot: '10:00',
    tourSize: 1,
    specialRequirements: '',
    paymentMethod: 'creditCard',
  });

  // Parse guide ID from URL
  const searchParams = new URLSearchParams(location.search);
  const guideId = searchParams.get('guideId');

  // Monument data with names and images
  const monumentsData = {
    'red-fort': {
      name: 'Red Fort',
      image: '/images/monuments/red-fort.jpg'
    },
    'taj-mahal': {
      name: 'Taj Mahal',
      image: '/images/monuments/taj-mahal.jpg'
    },
    'hawa-mahal': {
      name: 'Hawa Mahal',
      image: '/images/monuments/hawa-mahal.jpg'
    },
    'qutub-minar': {
      name: 'Qutub Minar',
      image: '/images/calender.jpg'
    },
    'india-gate': {
      name: 'India Gate',
      image: '/images/guide.jpg'
    },
    'humayun-tomb': {
      name: 'Humayun\'s Tomb',
      image: '/images/monuments/humayun-tomb.jpg'
    },
    // Fallback for other monuments
    'default': {
      name: 'Monument',
      image: '/images/guide2.jpg'
    }
  };

  // Get monument data
  const monumentData = monumentsData[monumentId] || monumentsData.default;

  // Red Fort guides data (used for all monuments in this demo)
  const guidesData = [
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

  // Fetch guide data based on ID
  useEffect(() => {
    if (guideId) {
      const guide = guidesData.find(guide => guide.id === parseInt(guideId));
      if (guide) {
        setGuideData(guide);
      } else {
        // If guide not found, use the first guide as fallback
        setGuideData(guidesData[0]);
      }
    } else {
      // If no guide ID specified, use the first guide
      setGuideData(guidesData[0]);
    }
    setLoading(false);
  }, [guideId, guidesData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setBookingData({
      ...bookingData,
      [name]: type === 'number' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Guide booking successful! Your tour with ${guideData.name} has been confirmed.`);
    // In a real app, you would submit this to your backend
    // Redirect to monument page after booking
    navigate(`/monument/${monumentId}`);
  };

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Get current date for the minimum date in the date picker
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    
    // Add leading zero if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    
    return `${year}-${month}-${day}`;
  };

  // Extract numeric value from price string
  const getNumericPrice = (priceString) => {
    const priceMatch = priceString.match(/₹(\d+)/);
    return priceMatch ? parseInt(priceMatch[1], 10) : 2000;
  };

  if (loading) {
    return (
      <div className="guide-booking-loading">
        <div className="loader"></div>
        <p>Loading guide information...</p>
      </div>
    );
  }

  return (
    <div className={`guide-booking-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="guide-booking-wrapper">
        <div className="back-link">
          <Link to={`/monument/${monumentId}/guides`}>
            <span className="back-icon">←</span>
            Back to Guides
          </Link>
        </div>

        <div className="guide-booking-header">
          <h1>Book Your Tour Guide</h1>
          <p>Complete your booking with one of our expert guides</p>
        </div>

        <div className="guide-booking-card">
          <div className="guide-profile">
            <div className="guide-profile-header">
              <div className="guide-image-container">
                <img 
                  src={guideData.image} 
                  alt={guideData.name} 
                  className="guide-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/guide2.jpg";
                  }}
                />
                <div className="guide-rating">
                  <span className="star-icon">★</span> 
                  <span>{guideData.rating}</span>
                </div>
              </div>
              
              <div className="guide-info">
                <h2 className="guide-name">{guideData.name}</h2>
                <div className="guide-specialization">{guideData.specialization}</div>
                
                <div className="guide-details">
                  <div className="guide-languages">
                    <span className="detail-icon">🗣️</span>
                    <span className="detail-label">Languages:</span>
                    <span className="detail-value">{guideData.languages.join(', ')}</span>
                  </div>
                  
                  <div className="guide-experience">
                    <span className="detail-icon">🏆</span>
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{guideData.experience}</span>
                  </div>
                </div>
                
                <div className="guide-price">
                  <span className="price-amount">{guideData.price}</span>
                </div>
              </div>
            </div>
            
            <div className="guide-bio">
              <h3>About Your Guide</h3>
              <p>{guideData.bio}</p>
            </div>
          </div>
          
          <div className="booking-form-container">
            <h3 className="booking-form-title">Tour Details</h3>
            
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label className="form-label" htmlFor="date">
                  <span className="label-icon">📅</span> Tour Date
                </label>
                <input
                  className="form-input"
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={bookingData.date}
                  onChange={handleChange}
                  min={getCurrentDate()} // Set min date to today
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">⏰</span> Time Slot
                </label>
                <div className="time-slots-container">
                  {timeSlots.map(time => (
                    <div 
                      key={time} 
                      className={`time-slot ${bookingData.timeSlot === time ? 'selected' : ''}`}
                      onClick={() => setBookingData({...bookingData, timeSlot: time})}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="tourSize">
                  <span className="label-icon">👥</span> Tour Group Size
                </label>
                <input
                  className="form-input"
                  id="tourSize"
                  name="tourSize"
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={bookingData.tourSize}
                  onChange={handleChange}
                />
                <span className="form-hint">Maximum 10 people per guide</span>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="specialRequirements">
                  <span className="label-icon">📝</span> Special Requirements
                </label>
                <textarea
                  className="form-textarea"
                  id="specialRequirements"
                  name="specialRequirements"
                  rows="3"
                  placeholder="Any special needs or specific areas of interest?"
                  value={bookingData.specialRequirements}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">💳</span> Payment Method
                </label>
                <div className="select-wrapper">
                  <select
                    className="form-select"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={bookingData.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="creditCard">Credit Card</option>
                    <option value="debitCard">Debit Card</option>
                    <option value="netBanking">Net Banking</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>
              </div>
              
              <div className="booking-summary">
                <h3 className="summary-title">Booking Summary</h3>
                
                <div className="summary-row">
                  <span className="summary-label">Guide:</span>
                  <span className="summary-value">{guideData.name}</span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Monument:</span>
                  <span className="summary-value">{monumentData.name}</span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Date:</span>
                  <span className="summary-value">{bookingData.date || "Not selected"}</span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Time:</span>
                  <span className="summary-value">{bookingData.timeSlot}</span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Group Size:</span>
                  <span className="summary-value">{bookingData.tourSize} {bookingData.tourSize > 1 ? 'people' : 'person'}</span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Tour Duration:</span>
                  <span className="summary-value">2 hours</span>
                </div>
                
                <div className="summary-total">
                  <span className="total-label">Total Amount:</span>
                  <span className="total-value">₹{getNumericPrice(guideData.price)}</span>
                </div>
              </div>
              
              <div className="form-actions">
                <button
                  className="booking-button"
                  type="submit"
                >
                  Confirm Booking
                </button>
              </div>
              
              <div className="booking-policies">
                <div className="policy-item">
                  <span className="policy-icon">ℹ️</span>
                  <span className="policy-text">Free cancellation up to 48 hours before the tour</span>
                </div>
                <div className="policy-item">
                  <span className="policy-icon">🔒</span>
                  <span className="policy-text">Secure payment process</span>
                </div>
                <div className="policy-item">
                  <span className="policy-icon">📞</span>
                  <span className="policy-text">Guide contact details will be sent after booking</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideBooking; 