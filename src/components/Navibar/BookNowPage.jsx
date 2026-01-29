// BookNowPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUserFriends, FaChevronLeft, FaStar, FaMapMarkerAlt, FaHeart, FaShareAlt, FaPhone, FaWhatsapp, FaRupeeSign, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import './BookNowPage.css';

const BookNowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search data from navigation state
  const { searchData } = location.state || {};
  
  // NAVIGATION BAR states - Initialize with search data
  const [area, setArea] = useState(searchData?.destination || '');
  const [checkIn, setCheckIn] = useState(searchData?.checkIn || '');
  const [checkOut, setCheckOut] = useState(searchData?.checkOut || '');
  const [rooms, setRooms] = useState(searchData?.rooms || 1);
  const [adults, setAdults] = useState(searchData?.adults || 2);
  const [children, setChildren] = useState(searchData?.children || 0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  // Format rooms & guests display
  const roomsGuestsDisplay = `${rooms} Room${rooms > 1 ? 's' : ''}, ${adults + children} Guest${adults + children > 1 ? 's' : ''}`;

  // Calculate nights and price
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return nights > 0 ? nights : 1;
    }
    return 1;
  };

  const nights = calculateNights();
  
  // Property data
  const property = {
    id: parseInt(id),
    title: "Grand Luxury Resort & Spa",
    rating: 4.8,
    reviews: 1247,
    location: area || "Goa, India",
    price: 8999,
    originalPrice: 11249,
    discount: 20,
    description: "Premium beachfront resort with private beach access, infinity pool, and world-class spa facilities. Experience luxury like never before with stunning ocean views and 5-star amenities.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop"
    ],
    features: ["Free WiFi", "Swimming Pool", "Free Parking", "Spa", "Gym", "Breakfast Included", "Beach Access", "Restaurant"],
    amenities: {
      beds: 2,
      baths: 2,
      size: "850 sq ft",
      type: "Luxury Suite"
    }
  };

  // Price calculation
  const subtotal = property.price * nights;
  const discount = property.discount ? (property.originalPrice * nights - subtotal) : 0;
  const taxes = subtotal * 0.18; // 18% GST
  const serviceFee = 299;
  const total = subtotal + taxes + serviceFee;

  const handleGuestChange = (type, operation) => {
    if (type === 'rooms') {
      setRooms(prev => {
        const newValue = operation === 'increase' ? prev + 1 : Math.max(1, prev - 1);
        return newValue;
      });
    } else if (type === 'adults') {
      setAdults(prev => {
        const newValue = operation === 'increase' ? prev + 1 : Math.max(1, prev - 1);
        return newValue;
      });
    } else if (type === 'children') {
      setChildren(prev => {
        const newValue = operation === 'increase' ? prev + 1 : Math.max(0, prev - 1);
        return newValue;
      });
    }
  };

  const handleSearch = () => {
    const searchData = {
      destination: area,
      checkIn,
      checkOut,
      rooms,
      adults,
      children
    };
    console.log('Searching:', searchData);
    // Save to localStorage
    localStorage.setItem('searchData', JSON.stringify(searchData));
  };

  const handleBookNow = () => {
    const booking = {
      bookingId: `BK${Date.now().toString().slice(-8)}`,
      propertyId: property.id,
      propertyName: property.title,
      searchData: {
        destination: area,
        checkIn,
        checkOut,
        rooms,
        adults,
        children
      },
      priceDetails: {
        nights,
        pricePerNight: property.price,
        subtotal,
        discount,
        taxes,
        serviceFee,
        total
      },
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    localStorage.setItem('booking', JSON.stringify(booking));
    alert(`Booking confirmed for ${property.title}!\nTotal: ₹${total.toLocaleString()}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Add date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const minCheckOut = checkIn ? 
    new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : today;

  return (
    <div className="book-now-page">
      {/* ========== NAVIGATION BAR ========== */}
      <nav className="mmt-navbar">
        <div className="navbar-container">
          <div className="nav-back">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FaChevronLeft /> Back
            </button>
          </div>
          
          <div className="nav-search">
            {/* Area or Property */}
            <div className="search-field">
              <input
                type="text"
                placeholder="Area or Property"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="search-input"
              />
            </div>
            
            {/* Check in */}
            <div className="search-field">
              <FaCalendarAlt className="field-icon" />
              <input
                type="date"
                placeholder="Check in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="search-input date-input"
                min={today}
              />
              <div className="date-display">{formatDate(checkIn)}</div>
            </div>
            
            {/* Check out */}
            <div className="search-field">
              <FaCalendarAlt className="field-icon" />
              <input
                type="date"
                placeholder="Check out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="search-input date-input"
                min={minCheckOut}
                disabled={!checkIn}
              />
              <div className="date-display">{formatDate(checkOut)}</div>
            </div>
            
            {/* Rooms & guests */}
            <div className="search-field guest-field" onClick={() => setShowGuestDropdown(!showGuestDropdown)}>
              <FaUserFriends className="field-icon" />
              <div className="guest-summary">
                {roomsGuestsDisplay}
              </div>
              
              {showGuestDropdown && (
                <div className="guest-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-header">
                    <h4>Travelers</h4>
                    <button 
                      type="button" 
                      className="close-dropdown"
                      onClick={() => setShowGuestDropdown(false)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="guest-option">
                    <div className="option-info">
                      <span className="option-title">Rooms</span>
                      <span className="option-subtitle">Maximum 10 rooms</span>
                    </div>
                    <div className="guest-counter">
                      <button 
                        type="button" 
                        className="counter-btn"
                        onClick={() => handleGuestChange('rooms', 'decrease')}
                        disabled={rooms <= 1}
                      >
                        −
                      </button>
                      <span className="counter-value">{rooms}</span>
                      <button 
                        type="button" 
                        className="counter-btn"
                        onClick={() => handleGuestChange('rooms', 'increase')}
                        disabled={rooms >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="guest-option">
                    <div className="option-info">
                      <span className="option-title">Adults</span>
                      <span className="option-subtitle">Age 13+</span>
                    </div>
                    <div className="guest-counter">
                      <button 
                        type="button" 
                        className="counter-btn"
                        onClick={() => handleGuestChange('adults', 'decrease')}
                        disabled={adults <= 1}
                      >
                        −
                      </button>
                      <span className="counter-value">{adults}</span>
                      <button 
                        type="button" 
                        className="counter-btn"
                        onClick={() => handleGuestChange('adults', 'increase')}
                        disabled={adults >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="guest-option">
                    <div className="option-info">
                      <span className="option-title">Children</span>
                      <span className="option-subtitle">Age 0-12</span>
                    </div>
                    <div className="guest-counter">
                      <button 
                        type="button" 
                        className="counter-btn"
                        onClick={() => handleGuestChange('children', 'decrease')}
                        disabled={children <= 0}
                      >
                        −
                      </button>
                      <span className="counter-value">{children}</span>
                      <button 
                        type="button" 
                        className="counter-btn"
                        onClick={() => handleGuestChange('children', 'increase')}
                        disabled={children >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="dropdown-footer">
                    <button 
                      type="button" 
                      className="guest-done-btn"
                      onClick={() => setShowGuestDropdown(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <button className="search-btn" onClick={handleSearch}>
              <FaSearch /> Search
            </button>
          </div>
          
          <div className="nav-actions">
            <button 
              className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => setWishlisted(!wishlisted)}
            >
              <FaHeart />
            </button>
            <button className="share-btn">
              <FaShareAlt />
            </button>
          </div>
        </div>
      </nav>

      {/* ========== MAIN CONTENT ========== */}
      <div className="main-container">
        {/* LEFT SIDE - Property Details */}
        <div className="left-panel">
          {/* Property Title with Search Summary */}
          <div className="property-header">
            <h1 className="property-title">{property.title}</h1>
            <div className="property-rating">
              <FaStar className="star-icon" />
              <span className="rating-value">{property.rating}</span>
              <span className="reviews">({property.reviews} reviews)</span>
            </div>
            
            {/* Display search summary */}
            {(checkIn || area) && (
              <div className="search-summary">
                {checkIn && checkOut && (
                  <span className="summary-item">
                    <FaCalendarAlt /> {formatDate(checkIn)} - {formatDate(checkOut)} ({nights} night{nights > 1 ? 's' : ''})
                  </span>
                )}
                <span className="summary-item">
                  <FaUserFriends /> {roomsGuestsDisplay}
                </span>
                {area && (
                  <span className="summary-item">
                    <FaMapMarkerAlt /> {area}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image">
              <img src={property.images[selectedImage]} alt={property.title} />
            </div>
            <div className="thumbnail-strip">
              {property.images.map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`Property ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION Card */}
          <div className="detail-card">
            <h3 className="card-title">DESCRIPTION</h3>
            <p className="description-text">{property.description}</p>
            <div className="property-features">
              <div className="feature-item">
                <strong>{property.amenities.beds}</strong> Beds
              </div>
              <div className="feature-item">
                <strong>{property.amenities.baths}</strong> Baths
              </div>
              <div className="feature-item">
                <strong>{property.amenities.size}</strong>
              </div>
              <div className="feature-item">
                <strong>{property.amenities.type}</strong>
              </div>
            </div>
            <div className="amenities-list">
              {property.features.map((feature, index) => (
                <span key={index} className="amenity-tag">{feature}</span>
              ))}
            </div>
          </div>

          {/* REVIEW Card */}
          <div className="detail-card">
            <h3 className="card-title">REVIEW</h3>
            <div className="review-summary">
              <div className="review-score">
                <span className="score">{property.rating}</span>
                <span className="score-label">/5</span>
              </div>
              <div className="review-details">
                <div className="rating-bars">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="rating-bar">
                      <span className="star-count">{star}★</span>
                      <div className="bar-container">
                        <div 
                          className="bar-fill" 
                          style={{ width: `${(star / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="review-highlights">
                  <div className="highlight">
                    <FaCheckCircle className="highlight-icon" />
                    <span>Cleanliness: 4.9</span>
                  </div>
                  <div className="highlight">
                    <FaCheckCircle className="highlight-icon" />
                    <span>Location: 4.8</span>
                  </div>
                  <div className="highlight">
                    <FaCheckCircle className="highlight-icon" />
                    <span>Service: 4.7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION Card */}
          <div className="detail-card">
            <h3 className="card-title">LOCATION</h3>
            <div className="location-info">
              <div className="location-details">
                <FaMapMarkerAlt className="location-icon" />
                <div>
                  <h4>{property.location}</h4>
                  <p className="location-address">Beach Road, North Goa, India - 403001</p>
                  <div className="distance-info">
                    <span>• 5 min to beach</span>
                    <span>• 20 min to airport</span>
                    <span>• 15 min to city center</span>
                  </div>
                </div>
              </div>
              <div className="map-placeholder">
                <div className="map-content">
                  <FaMapMarkerAlt size={40} />
                  <p>View on Map</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Booking Card */}
        <div className="right-panel">
          <div className="booking-card">
            {/* PRICE Section */}
            <div className="price-section">
              <div className="price-header">
                <div className="price-display">
                  <span className="price-label">Starting from</span>
                  <div className="price-amount">
                    <FaRupeeSign className="currency-icon" />
                    <span className="amount">{property.price.toLocaleString()}</span>
                    <span className="per-night">/night</span>
                  </div>
                  <div className="original-price">
                    <FaRupeeSign /> {property.originalPrice.toLocaleString()}
                    <span className="discount-badge">-{property.discount}% OFF</span>
                  </div>
                </div>
              </div>
              
              <div className="price-details">
                <div className="price-row">
                  <span>₹{property.price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="price-row discount">
                    <span>Discount ({property.discount}%)</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="price-row">
                  <span>Taxes & Fees (18%)</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                
                <div className="price-row">
                  <span>Service Fee</span>
                  <span>₹{serviceFee.toLocaleString()}</span>
                </div>
                
                <div className="price-divider"></div>
                
                <div className="price-row total">
                  <strong>Total Amount</strong>
                  <strong className="total-amount">₹{total.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* BOOK Button */}
            <button className="book-now-btn" onClick={handleBookNow}>
              BOOK NOW - ₹{total.toLocaleString()}
            </button>

            {/* More options */}
            <div className="more-options">
              <div className="options-header">
                <FaInfoCircle className="options-icon" />
                <span>More options</span>
              </div>
              <div className="options-list">
                <div className="option-item">
                  <input type="checkbox" id="insurance" />
                  <label htmlFor="insurance">Add Travel Insurance</label>
                </div>
                <div className="option-item">
                  <input type="checkbox" id="early-checkin" />
                  <label htmlFor="early-checkin">Early Check-in (10 AM)</label>
                </div>
                <div className="option-item">
                  <input type="checkbox" id="airport-pickup" />
                  <label htmlFor="airport-pickup">Airport Pickup Service</label>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="help-section">
              <h4>Need help with booking?</h4>
              <div className="help-buttons">
                <button className="help-btn">
                  <FaPhone /> Call Now
                </button>
                <button className="help-btn whatsapp-btn">
                  <FaWhatsapp /> WhatsApp
                </button>
              </div>
              <p className="help-text">Available 24x7 for booking support</p>
            </div>

            {/* Secure Booking */}
            <div className="secure-booking">
              <div className="secure-badge">
                <FaCheckCircle />
              </div>
              <div className="secure-text">
                <strong>Secure Booking</strong>
                <span>Your payment is protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNowPage;