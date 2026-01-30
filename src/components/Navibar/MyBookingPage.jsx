// MyBookingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, FaMapMarkerAlt, FaHotel, 
  FaUsers, FaBed, FaRupeeSign, FaCheckCircle,
  FaTimesCircle, FaTrash, FaPrint, FaStar
} from 'react-icons/fa';
import './MyBookingPage.css';

const MyBookingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    setBookings(savedBookings);
    
    // If new booking was just made, show success message
    if (location.state?.newBooking) {
      alert(`Booking confirmed! ID: ${location.state.newBooking.bookingId}`);
    }
  }, [location.state]);

  const getStatusBadge = (status, checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    
    if (status === 'cancelled') {
      return { text: 'Cancelled', color: '#ef4444', icon: <FaTimesCircle /> };
    }
    
    if (checkIn > today) {
      return { text: 'Upcoming', color: '#3b82f6', icon: <FaCheckCircle /> };
    } else {
      return { text: 'Completed', color: '#10b981', icon: <FaCheckCircle /> };
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updatedBookings = bookings.map(booking => 
        booking.bookingId === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      );
      
      setBookings(updatedBookings);
      localStorage.setItem('myBookings', JSON.stringify(updatedBookings));
      alert('Booking cancelled successfully');
    }
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Delete this booking permanently?')) {
      const updatedBookings = bookings.filter(booking => booking.bookingId !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('myBookings', JSON.stringify(updatedBookings));
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') {
      const checkIn = new Date(booking.searchData.checkIn);
      return booking.status === 'confirmed' && checkIn > new Date();
    }
    if (activeTab === 'completed') {
      const checkOut = new Date(booking.searchData.checkOut);
      return booking.status === 'confirmed' && checkOut < new Date();
    }
    if (activeTab === 'cancelled') {
      return booking.status === 'cancelled';
    }
    return true;
  });

  const calculateStats = () => {
    const total = bookings.length;
    const upcoming = bookings.filter(b => {
      const checkIn = new Date(b.searchData.checkIn);
      return b.status === 'confirmed' && checkIn > new Date();
    }).length;
    const completed = bookings.filter(b => {
      const checkOut = new Date(b.searchData.checkOut);
      return b.status === 'confirmed' && checkOut < new Date();
    }).length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    
    return { total, upcoming, completed, cancelled };
  };

  const stats = calculateStats();

  return (
    <div className="my-bookings-page">
      <div className="bookings-header">
        <h1><FaCalendarAlt /> My Bookings</h1>
        <p>Manage all your hotel bookings in one place</p>
      </div>

      {/* Stats Cards */}
      <div className="booking-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon upcoming">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>{stats.upcoming}</h3>
            <p>Upcoming</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon cancelled">
            <FaTimesCircle />
          </div>
          <div className="stat-info">
            <h3>{stats.cancelled}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="booking-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({stats.total})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({stats.upcoming})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({stats.completed})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled ({stats.cancelled})
        </button>
      </div>

      {/* Bookings List */}
      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="no-bookings">
            <div className="empty-state">
              <FaCalendarAlt className="empty-icon" />
              <h3>No bookings found</h3>
              <p>You have no bookings in this category</p>
              <button 
                className="browse-btn"
                onClick={() => navigate('/')}
              >
                Browse Properties
              </button>
            </div>
          </div>
        ) : (
          filteredBookings.map(booking => {
            const statusBadge = getStatusBadge(booking.status, booking.searchData.checkIn);
            const nights = booking.priceDetails.nights;
            
            return (
              <div key={booking.bookingId} className="booking-card">
                <div className="booking-image">
                  <img src={booking.propertyImage} alt={booking.propertyName} />
                  <div className="booking-status-badge" style={{ backgroundColor: statusBadge.color }}>
                    {statusBadge.icon}
                    <span>{statusBadge.text}</span>
                  </div>
                </div>
                
                <div className="booking-content">
                  <div className="booking-header">
                    <div>
                      <h3>{booking.propertyName}</h3>
                      <div className="property-meta">
                        <span className="location">
                          <FaMapMarkerAlt /> {booking.propertyLocation}
                        </span>
                        <span className="type">
                          <FaHotel /> {booking.propertyType}
                        </span>
                      </div>
                    </div>
                    <div className="booking-id">
                      Booking ID: {booking.bookingId}
                    </div>
                  </div>
                  
                  <div className="booking-details">
                    <div className="detail-row">
                      <div className="detail-item">
                        <FaCalendarAlt />
                        <div>
                          <span className="detail-label">Check-in</span>
                          <span className="detail-value">{booking.searchData.checkIn}</span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <FaCalendarAlt />
                        <div>
                          <span className="detail-label">Check-out</span>
                          <span className="detail-value">{booking.searchData.checkOut}</span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <FaUsers />
                        <div>
                          <span className="detail-label">Guests</span>
                          <span className="detail-value">
                            {booking.searchData.adults + booking.searchData.children} guests
                          </span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <FaBed />
                        <div>
                          <span className="detail-label">Rooms</span>
                          <span className="detail-value">
                            {booking.searchData.rooms} room{booking.searchData.rooms > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="price-section">
                      <div className="price-summary">
                        <div className="night-price">
                          <FaRupeeSign /> {booking.priceDetails.pricePerNight.toLocaleString()}
                          <span className="per-night">/night</span>
                        </div>
                        <div className="total-nights">
                          {nights} night{nights > 1 ? 's' : ''}
                        </div>
                      </div>
                      
                      <div className="total-price">
                        <span>Total Amount:</span>
                        <strong className="amount">
                          <FaRupeeSign /> {booking.priceDetails.total.toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  </div>
                  
                  <div className="booking-actions">
                    <div className="booking-date">
                      Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                    
                    <div className="action-buttons">
                      {booking.status === 'confirmed' && new Date(booking.searchData.checkIn) > new Date() && (
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelBooking(booking.bookingId)}
                        >
                          <FaTimesCircle /> Cancel Booking
                        </button>
                      )}
                      
                      <button className="print-btn">
                        <FaPrint /> Print Receipt
                      </button>
                      
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteBooking(booking.bookingId)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;