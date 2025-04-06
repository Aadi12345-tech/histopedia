import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import './BookTicket.css';

const BookTicket = () => {
  const { monumentId } = useParams();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookingType, setBookingType] = useState('ticket'); // 'ticket' or 'guide'
  const [guideData, setGuideData] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    numberOfVisitors: 1,
    visitorType: 'adult',
    paymentMethod: 'creditCard',
    timeSlot: '10:00'
  });

  // Check login status when component mounts
  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('histopedia_user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Check if we're booking a guide based on the location state
  useEffect(() => {
    if (location.state && location.state.guide) {
      setBookingType('guide');
      setGuideData(location.state.guide);
    }
  }, [location]);

  // Monument data with names and images
  const monumentsData = {
    'red-fort': {
      name: 'Red Fort',
      image: '/images/monuments/red-fort.jpg',
      price: 35
    },
    'taj-mahal': {
      name: 'Taj Mahal',
      image: '/images/monuments/taj-mahal.jpg',
      price: 45
    },
    'hawa-mahal': {
      name: 'Hawa Mahal',
      image: '/images/monuments/hawa-mahal.jpg',
      price: 50
    },
    'qutub-minar': {
      name: 'Qutub Minar',
      image: '/images/calender.jpg',
      price: 30
    },
    'india-gate': {
      name: 'India Gate',
      image: '/images/guide.jpg',
      price: 0
    },
    'humayun-tomb': {
      name: 'Humayun\'s Tomb',
      image: '/images/monuments/humayun-tomb.jpg',
      price: 35
    },
    // Fallback for other monuments
    'default': {
      name: 'Monument',
      image: '/images/guide2.jpg',
      price: 25
    }
  };

  // Get monument data or use default
  const monumentData = monumentsData[monumentId] || monumentsData.default;

  // Calculate total price based on booking type and details
  const calculateTotalPrice = () => {
    if (bookingType === 'guide' && guideData) {
      // Extract the numeric part from the price string and convert to number
      const guidePriceStr = guideData.price || "₹2000 for a 2-hour tour";
      const priceMatch = guidePriceStr.match(/₹(\d+)/);
      const guidePrice = priceMatch ? parseInt(priceMatch[1], 10) : 2000;
      
      return guidePrice;
    } else {
      // Regular ticket price calculation
      let basePrice = monumentData.price * bookingData.numberOfVisitors;
      
      // Apply discount for children
      if (bookingData.visitorType === 'child') {
        basePrice = basePrice * 0.5; // 50% discount for children
      }
      
      return basePrice;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: name === 'numberOfVisitors' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${bookingType === 'guide' ? 'Guide booking' : 'Ticket booking'} successful! Your booking has been confirmed.`);
    // In a real app, you would submit this to your backend
  };

  // If user is not logged in, redirect to user login page with return URL
  if (!isLoggedIn) {
    return <Navigate to={`/user-login?redirect=/monument/${monumentId}/book-ticket${location.search}${location.state ? `&bookingType=${bookingType}` : ''}`} />;
  }

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

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
  ];

  return (
    <div className="booking-container">
      <div className="booking-wrapper">
        <div className="back-link">
          <Link to={bookingType === 'guide' ? `/monument/${monumentId}/guides` : `/monument/${monumentId}`}>
            <span className="back-icon">←</span>
            Back to {bookingType === 'guide' ? 'Guides' : 'Monument'}
          </Link>
        </div>

        <div className="booking-card">
          <div className="booking-header">
            <h1 className="booking-title">
              {bookingType === 'guide' 
                ? `Book a Tour with Guide` 
                : `Book Your Visit to ${monumentData.name}`}
            </h1>
            <div className="booking-subtitle">
              {bookingType === 'guide'
                ? 'Reserve your personal guided tour experience'
                : 'Reserve your tickets for a memorable experience'}
            </div>
          </div>
          
          {bookingType === 'guide' && guideData ? (
            <div className="guide-preview">
              <div className="guide-preview-image-container">
                <img 
                  src={guideData.image} 
                  alt={guideData.name} 
                  className="guide-preview-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/guide2.jpg";
                  }}
                />
                <div className="guide-preview-rating">
                  <span className="star-icon">★</span> 
                  <span>{guideData.rating}</span>
                </div>
              </div>
              <div className="guide-preview-info">
                <h2 className="guide-preview-title">{guideData.name}</h2>
                <div className="guide-preview-specialization">{guideData.specialization}</div>
                <div className="guide-preview-details">
                  <div className="guide-preview-languages">
                    <span className="label-icon">🗣️</span>
                    <span>{guideData.languages.join(', ')}</span>
                  </div>
                  <div className="guide-preview-experience">
                    <span className="label-icon">🏆</span>
                    <span>{guideData.experience}</span>
                  </div>
                </div>
                <div className="guide-preview-price">
                  <span className="price-tag">{guideData.price || "₹2000 for a 2-hour tour"}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="monument-preview">
              <div className="preview-image-container">
                <img src={monumentData.image} alt={monumentData.name} className="preview-image" />
              </div>
              <div className="preview-info">
                <h2 className="preview-title">{monumentData.name}</h2>
                <div className="preview-price">
                  <span className="price-tag">₹{monumentData.price}</span> per person
                </div>
                <div className="preview-features">
                  <div className="feature-item">
                    <span className="feature-icon">✓</span> Skip the ticket line
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span> Instant confirmation
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span> Mobile tickets accepted
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label className="form-label" htmlFor="date">
                <span className="label-icon">📅</span> Date
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
            
            {bookingType === 'guide' ? (
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
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="numberOfVisitors">
                    <span className="label-icon">👥</span> Number of Visitors
                  </label>
                  <input
                    className="form-input"
                    id="numberOfVisitors"
                    name="numberOfVisitors"
                    type="number"
                    min="1"
                    max="20"
                    required
                    value={bookingData.numberOfVisitors}
                    onChange={handleChange}
                  />
                  <span className="form-hint">Maximum 20 visitors per booking</span>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">🎟️</span> Visitor Type
                  </label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input 
                        id="adult" 
                        name="visitorType" 
                        type="radio" 
                        value="adult"
                        checked={bookingData.visitorType === 'adult'} 
                        onChange={handleChange}
                        className="radio-input" 
                      />
                      <label htmlFor="adult" className="radio-label">
                        Adult (Full Price)
                      </label>
                    </div>
                    <div className="radio-option">
                      <input 
                        id="child" 
                        name="visitorType" 
                        type="radio" 
                        value="child"
                        checked={bookingData.visitorType === 'child'} 
                        onChange={handleChange}
                        className="radio-input" 
                      />
                      <label htmlFor="child" className="radio-label">
                        Child (50% Discount)
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
            
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
              {bookingType === 'guide' && guideData ? (
                <>
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
                    <span className="summary-label">Tour Duration:</span>
                    <span className="summary-value">2 hours</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="summary-row">
                    <span className="summary-label">Monument:</span>
                    <span className="summary-value">{monumentData.name}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Ticket Price:</span>
                    <span className="summary-value">₹{monumentData.price} per person</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Number of Visitors:</span>
                    <span className="summary-value">{bookingData.numberOfVisitors}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Visitor Type:</span>
                    <span className="summary-value">{bookingData.visitorType === 'adult' ? 'Adult' : 'Child'}</span>
                  </div>
                  {bookingData.visitorType === 'child' && (
                    <div className="summary-row">
                      <span className="summary-label">Discount:</span>
                      <span className="summary-discount">50% (Child)</span>
                    </div>
                  )}
                </>
              )}
              <div className="summary-total">
                <span className="total-label">Total Amount:</span>
                <span className="total-value">₹{calculateTotalPrice()}</span>
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
                <span className="policy-text">Free cancellation up to 24 hours before the visit</span>
              </div>
              <div className="policy-item">
                <span className="policy-icon">🔒</span>
                <span className="policy-text">Secure payment process</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTicket; 