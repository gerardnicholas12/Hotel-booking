import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUserFriends, 
  FaChevronLeft, 
  FaStar, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaShareAlt, 
  FaPhone, 
  FaWhatsapp, 
  FaRupeeSign, 
  FaCheckCircle, 
  FaInfoCircle,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaSpa,
  FaDumbbell,
  FaCoffee,
  FaUmbrellaBeach,
  FaUtensils
} from 'react-icons/fa';
import './BookNowPage.css';

const BookNowPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search data from navigation state or localStorage
  const locationSearchData = location.state?.searchData;
  const storedSearchData = JSON.parse(localStorage.getItem('searchData') || '{}');
  const initialSearchData = locationSearchData || storedSearchData;
  
  // Search form states
  const [area, setArea] = useState(initialSearchData.destination || '');
  const [checkIn, setCheckIn] = useState(initialSearchData.checkIn || '');
  const [checkOut, setCheckOut] = useState(initialSearchData.checkOut || '');
  const [rooms, setRooms] = useState(initialSearchData.rooms || 1);
  const [adults, setAdults] = useState(initialSearchData.adults || 2);
  const [children, setChildren] = useState(initialSearchData.children || 0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  
  // UI states
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  
  // Property data - In real app, fetch from API
  const property = {
    id: parseInt(propertyId) || 1,
    title: "Grand Luxury Resort & Spa",
    rating: 4.8,
    reviews: 1247,
    location: "Goa, India",
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
    features: [
      { name: "Free WiFi", icon: <FaWifi /> },
      { name: "Swimming Pool", icon: <FaSwimmingPool /> },
      { name: "Free Parking", icon: <FaParking /> },
      { name: "Spa", icon: <FaSpa /> },
      { name: "Gym", icon: <FaDumbbell /> },
      { name: "Breakfast", icon: <FaCoffee /> },
      { name: "Beach Access", icon: <FaUmbrellaBeach /> },
      { name: "Restaurant", icon: <FaUtensils /> }
    ],
    amenities: {
      beds: 2,
      baths: 2,
      size: "850 sq ft",
      type: "Luxury Suite"
    }
  };

  // Calculations
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
  const subtotal = property.price * nights * rooms;
  const discountAmount = property.discount ? (property.originalPrice * nights * rooms - subtotal) : 0;
  const taxes = Math.round(subtotal * 0.18); // 18% GST
  const serviceFee = 299;
  const total = subtotal + taxes + serviceFee;

  // Date helpers
  const today = new Date().toISOString().split('T')[0];
  const minCheckOut = checkIn ? 
    new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : today;

  const formatDate = (dateString) => {
    if (!dateString) return "Add date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const roomsGuestsDisplay = `${rooms} Room${rooms > 1 ? 's' : ''}, ${adults + children} Guest${adults + children > 1 ? 's' : ''}`;

  // Handlers
  const handleGuestChange = (type, operation) => {
    const changes = {
      rooms: { setter: setRooms, min: 1, max: 10 },
      adults: { setter: setAdults, min: 1, max: 10 },
      children: { setter: setChildren, min: 0, max: 10 }
    };

    const config = changes[type];
    if (!config) return;

    config.setter(prev => {
      const newValue = operation === 'increase' ? prev + 1 : prev - 1;
      return Math.max(config.min, Math.min(config.max, newValue));
    });
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
    localStorage.setItem('searchData', JSON.stringify(searchData));
    console.log('Search updated:', searchData);
  };

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    const booking = {
      bookingId: `BK${Date.now().toString().slice(-8)}`,
      propertyId: property.id,
      propertyName: property.title,
      propertyImage: property.images[0],
      propertyLocation: property.location,
      propertyType: "Luxury Resort",
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
        discount: discountAmount,
        taxes,
        serviceFee,
        total
      },
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('myBookings', JSON.stringify(existingBookings));
    
    alert(`Booking confirmed for ${property.title}!\nBooking ID: ${booking.bookingId}\nTotal: ₹${total.toLocaleString()}`);
    navigate('/my-bookings', { state: { newBooking: booking } });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="book-now-page">
      {/* Navigation Bar */}
      <nav className="booking-navbar">
        <div className="navbar-container">
          {/* Back Button */}
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaChevronLeft />
            <span>Back</span>
          </button>

          {/* Search Form */}
          <div className="search-form">
            <div className="search-field">
              <input
                type="text"
                placeholder="Where are you going?"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="search-field date-field">
              <FaCalendarAlt className="field-icon" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={today}
                className="date-input"
              />
              <span className="date-label">{formatDate(checkIn)}</span>
            </div>

            <div className="search-field date-field">
              <FaCalendarAlt className="field-icon" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={minCheckOut}
                disabled={!checkIn}
                className="date-input"
              />
              <span className="date-label">{formatDate(checkOut)}</span>
            </div>

            <div className="search-field guest-field">
              <FaUserFriends className="field-icon" />
              <div 
                className="guest-button"
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              >
                {roomsGuestsDisplay}
              </div>

              {showGuestDropdown && (
                <div className="guest-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-header">
                    <h4>Guests & Rooms</h4>
                    <button onClick={() => setShowGuestDropdown(false)}>×</button>
                  </div>

                  {[
                    { type: 'rooms', label: 'Rooms', subtitle: 'Max 10', value: rooms },
                    { type: 'adults', label: 'Adults', subtitle: 'Age 13+', value: adults },
                    { type: 'children', label: 'Children', subtitle: 'Age 0-12', value: children }
                  ].map(({ type, label, subtitle, value }) => (
                    <div key={type} className="guest-row">
                      <div className="guest-info">
                        <span className="guest-label">{label}</span>
                        <span className="guest-subtitle">{subtitle}</span>
                      </div>
                      <div className="guest-controls">
                        <button
                          onClick={() => handleGuestChange(type, 'decrease')}
                          disabled={value <= (type === 'children' ? 0 : 1)}
                          className="guest-btn"
                        >
                          −
                        </button>
                        <span className="guest-value">{value}</span>
                        <button
                          onClick={() => handleGuestChange(type, 'increase')}
                          disabled={value >= 10}
                          className="guest-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}

                  <button 
                    className="apply-btn"
                    onClick={() => setShowGuestDropdown(false)}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <button className="search-button" onClick={handleSearch}>
              <FaSearch />
              <span>Search</span>
            </button>
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <button 
              className={`action-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => setWishlisted(!wishlisted)}
              title="Add to Wishlist"
            >
              <FaHeart />
            </button>
            <button className="action-btn" onClick={handleShare} title="Share">
              <FaShareAlt />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="booking-content">
        {/* Left Panel - Property Details */}
        <div className="property-details">
          {/* Property Header */}
          <section className="property-header">
            <h1 className="property-name">{property.title}</h1>
            <div className="property-meta">
              <div className="rating">
                <FaStar />
                <span className="rating-value">{property.rating}</span>
                <span className="rating-reviews">({property.reviews} reviews)</span>
              </div>
              <div className="location">
                <FaMapMarkerAlt />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Booking Summary */}
            {checkIn && (
              <div className="booking-summary">
                <div className="summary-item">
                  <FaCalendarAlt />
                  <span>{formatDate(checkIn)} - {formatDate(checkOut)}</span>
                  <span className="nights">({nights} night{nights > 1 ? 's' : ''})</span>
                </div>
                <div className="summary-item">
                  <FaUserFriends />
                  <span>{roomsGuestsDisplay}</span>
                </div>
              </div>
            )}
          </section>

          {/* Image Gallery */}
          <section className="image-gallery">
            <div className="main-image">
              <img src={property.images[selectedImage]} alt={property.title} />
            </div>
            <div className="thumbnail-grid">
              {property.images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`View ${index + 1}`} />
                </button>
              ))}
            </div>
          </section>

          {/* Description */}
          <section className="info-section">
            <h2 className="section-title">About this property</h2>
            <p className="property-description">{property.description}</p>
            
            <div className="amenities-grid">
              <div className="amenity-item">
                <strong>{property.amenities.beds}</strong>
                <span>Bedrooms</span>
              </div>
              <div className="amenity-item">
                <strong>{property.amenities.baths}</strong>
                <span>Bathrooms</span>
              </div>
              <div className="amenity-item">
                <strong>{property.amenities.size}</strong>
                <span>Total Area</span>
              </div>
              <div className="amenity-item">
                <strong>{property.amenities.type}</strong>
                <span>Room Type</span>
              </div>
            </div>

            <div className="features-list">
              {property.features.map((feature, index) => (
                <div key={index} className="feature-tag">
                  {feature.icon}
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="info-section">
            <h2 className="section-title">Guest Reviews</h2>
            <div className="review-overview">
              <div className="review-score">
                <div className="score-number">{property.rating}</div>
                <div className="score-label">out of 5</div>
              </div>
              <div className="review-bars">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="review-bar">
                    <span className="stars">{stars} ★</span>
                    <div className="bar">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${(stars / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="review-highlights">
              <div className="highlight-item">
                <FaCheckCircle />
                <span>Cleanliness: 4.9</span>
              </div>
              <div className="highlight-item">
                <FaCheckCircle />
                <span>Location: 4.8</span>
              </div>
              <div className="highlight-item">
                <FaCheckCircle />
                <span>Service: 4.7</span>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="info-section">
            <h2 className="section-title">Location</h2>
            <div className="location-info">
              <FaMapMarkerAlt className="location-icon" />
              <div className="location-details">
                <h3>{property.location}</h3>
                <p className="address">Beach Road, North Goa, India - 403001</p>
                <div className="distances">
                  <span>• 5 min to beach</span>
                  <span>• 20 min to airport</span>
                  <span>• 15 min to city center</span>
                </div>
              </div>
            </div>
            <div className="map-preview">
              <FaMapMarkerAlt size={48} />
              <p>View on Map</p>
            </div>
          </section>
        </div>

        {/* Right Panel - Booking Card */}
        <aside className="booking-sidebar">
          <div className="booking-card">
            {/* Price Header */}
            <div className="price-header">
              <div className="price-main">
                <span className="price-label">From</span>
                <div className="price-value">
                  <FaRupeeSign />
                  <span className="amount">{property.price.toLocaleString()}</span>
                  <span className="period">/night</span>
                </div>
                {property.discount > 0 && (
                  <div className="price-original">
                    <FaRupeeSign />
                    <span>{property.originalPrice.toLocaleString()}</span>
                    <span className="discount-tag">-{property.discount}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <div className="price-line">
                <span>₹{property.price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''} × {rooms} room{rooms > 1 ? 's' : ''}</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="price-line discount">
                  <span>Discount ({property.discount}%)</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              
              <div className="price-line">
                <span>Taxes & Fees</span>
                <span>₹{taxes.toLocaleString()}</span>
              </div>
              
              <div className="price-line">
                <span>Service Fee</span>
                <span>₹{serviceFee.toLocaleString()}</span>
              </div>
              
              <div className="price-divider" />
              
              <div className="price-line total">
                <strong>Total</strong>
                <strong className="total-value">₹{total.toLocaleString()}</strong>
              </div>
            </div>

            {/* Book Button */}
            <button className="book-button" onClick={handleBookNow}>
              Book Now - ₹{total.toLocaleString()}
            </button>

            {/* Additional Options */}
            <div className="additional-options">
              <h4>
                <FaInfoCircle />
                <span>Add-ons</span>
              </h4>
              <label className="checkbox-option">
                <input type="checkbox" />
                <span>Travel Insurance (+₹500)</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" />
                <span>Early Check-in (+₹1000)</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" />
                <span>Airport Pickup (+₹2000)</span>
              </label>
            </div>

            {/* Help Section */}
            <div className="help-section">
              <h4>Need Help?</h4>
              <div className="help-buttons">
                <button className="help-btn">
                  <FaPhone />
                  <span>Call</span>
                </button>
                <button className="help-btn whatsapp">
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </button>
              </div>
              <p className="help-text">Available 24/7</p>
            </div>

            {/* Trust Badge */}
            <div className="trust-badge">
              <FaCheckCircle />
              <div className="trust-text">
                <strong>Secure Booking</strong>
                <span>Your payment is protected</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookNowPage;