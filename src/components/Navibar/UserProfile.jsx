// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserProfile.css';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCreditCard, FaHistory, FaHeart, FaCog,
  FaShieldAlt, FaBell, FaQuestionCircle, FaSignOutAlt,
  FaEdit, FaCamera, FaCheck, FaTimes,
  FaKey, FaGlobe, FaLock, FaStar,
  FaFileInvoice, FaHeadset, FaTrash
} from 'react-icons/fa';

const UserProfile = () => {
  const navigate = useNavigate();
  
  // User data state
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=008cff&color=fff&size=150',
    location: 'Mumbai, India',
    memberSince: '2022',
    loyaltyPoints: 1250,
    tier: 'Gold',
    verified: true
  });

  const [activeTab, setActiveTab] = useState('Profile');
  const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");
  if (tab) {
    setActiveTab(tab);
  }
}, [location.search]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Mock data for bookings
  useEffect(() => {
    // Mock bookings data
    const mockBookings = [
      {
        id: 'BK12345678',
        propertyName: 'Grand Luxury Resort & Spa',
        propertyImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        checkIn: '2024-03-15',
        checkOut: '2024-03-18',
        guests: 2,
        rooms: 1,
        totalAmount: 26997,
        status: 'confirmed',
        bookingDate: '2024-02-10'
      },
      {
        id: 'BK87654321',
        propertyName: 'Beachfront Villa Paradise',
        propertyImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227',
        checkIn: '2024-04-05',
        checkOut: '2024-04-10',
        guests: 4,
        rooms: 2,
        totalAmount: 58990,
        status: 'upcoming',
        bookingDate: '2024-02-15'
      }
    ];

    // Mock wishlist data
    const mockWishlist = [
      {
        id: 1,
        name: 'Mountain View Resort',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
        price: 7500,
        location: 'Manali, India',
        rating: 4.7
      },
      {
        id: 2,
        name: 'Urban Luxury Apartment',
        image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8',
        price: 4500,
        location: 'Bangalore, India',
        rating: 4.5
      }
    ];

    setBookings(mockBookings);
    setWishlist(mockWishlist);
  }, []);

  // Tabs configuration
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <FaUser /> },
    { id: 'bookings', label: 'My Bookings', icon: <FaHistory /> },
    { id: 'wishlist', label: 'Wishlist', icon: <FaHeart /> },
    { id: 'payments', label: 'Payments', icon: <FaCreditCard /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { id: 'preferences', label: 'Preferences', icon: <FaCog /> }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    // In real app, API call to update user data
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // API call to delete account
      alert('Account deletion request submitted.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="user-profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="container">
          <div className="header-content">
            <h1 className="profile-title">My Account</h1>
            <div className="header-actions">
              <button className="support-btn">
                <FaHeadset /> 24x7 Support
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          {/* User Summary Card */}
          <div className="user-summary-card">
            <div className="avatar-section">
              <div className="avatar-container">
                <img src={userData.avatar} alt={userData.name} className="user-avatar" />
                <button className="avatar-edit-btn">
                  <FaCamera />
                </button>
              </div>
              <div className="user-info">
                <h3 className="user-name">{userData.name}</h3>
                <div className="user-tier">
                  <FaStar className="tier-icon" />
                  <span className="tier-badge">{userData.tier} Member</span>
                </div>
                <div className="user-stats">
                  <div className="stat-item">
                    <span className="stat-value">{userData.loyaltyPoints}</span>
                    <span className="stat-label">Points</span>
                  </div>
                  <div className="divider"></div>
                  <div className="stat-item">
                    <span className="stat-value">{bookings.length}</span>
                    <span className="stat-label">Bookings</span>
                  </div>
                  <div className="divider"></div>
                  <div className="stat-item">
                    <span className="stat-value">{wishlist.length}</span>
                    <span className="stat-label">Wishlist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="sidebar-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h4 className="actions-title">Quick Actions</h4>
            <button className="action-btn">
              <FaFileInvoice /> Download Invoices
            </button>
            <button className="action-btn">
              <FaQuestionCircle /> Help Center
            </button>
            <button className="action-btn danger" onClick={handleDeleteAccount}>
              <FaTrash /> Delete Account
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2 className="tab-title">
                  <FaUser /> Personal Information
                </h2>
                {!isEditing && (
                  <button className="edit-btn" onClick={handleEdit}>
                    <FaEdit /> Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="edit-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        value={editData.location}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="save-btn" onClick={handleSave}>
                      <FaCheck /> Save Changes
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-cards">
                  <div className="info-card">
                    <div className="card-header">
                      <FaUser className="card-icon" />
                      <h3>Basic Information</h3>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{userData.name}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Email</span>
                        <span className="info-value">{userData.email}</span>
                        {userData.verified && (
                          <span className="verified-badge">Verified</span>
                        )}
                      </div>
                      <div className="info-row">
                        <span className="info-label">Phone</span>
                        <span className="info-value">{userData.phone}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Member Since</span>
                        <span className="info-value">{userData.memberSince}</span>
                      </div>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="card-header">
                      <FaMapMarkerAlt className="card-icon" />
                      <h3>Location & Preferences</h3>
                    </div>
                    <div className="card-content">
                      <div className="info-row">
                        <span className="info-label">Current Location</span>
                        <span className="info-value">{userData.location}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Preferred Currency</span>
                        <span className="info-value">Indian Rupee (₹)</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Language</span>
                        <span className="info-value">English</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Time Zone</span>
                        <span className="info-value">IST (UTC+5:30)</span>
                      </div>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="card-header">
                      <FaStar className="card-icon" />
                      <h3>Loyalty Program</h3>
                    </div>
                    <div className="card-content">
                      <div className="loyalty-tier">
                        <div className="tier-info">
                          <div className="tier-level">{userData.tier} Tier</div>
                          <div className="tier-progress">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: '65%' }}
                              ></div>
                            </div>
                            <div className="progress-text">
                              {userData.loyaltyPoints} / 2000 points to Platinum
                            </div>
                          </div>
                        </div>
                        <div className="tier-benefits">
                          <h4>Benefits:</h4>
                          <ul className="benefits-list">
                            <li>✓ Priority Support</li>
                            <li>✓ Exclusive Deals</li>
                            <li>✓ Early Check-in</li>
                            <li>✓ Free Cancellation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* My Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2 className="tab-title">
                  <FaHistory /> My Bookings
                </h2>
                <div className="booking-filters">
                  <button className="filter-btn active">All</button>
                  <button className="filter-btn">Upcoming</button>
                  <button className="filter-btn">Completed</button>
                  <button className="filter-btn">Cancelled</button>
                </div>
              </div>

              <div className="bookings-list">
                {bookings.length === 0 ? (
                  <div className="empty-state">
                    <FaHistory className="empty-icon" />
                    <h3>No bookings yet</h3>
                    <p>Start your journey by booking your first stay!</p>
                    <button className="explore-btn" onClick={() => navigate('/')}>
                      Explore Properties
                    </button>
                  </div>
                ) : (
                  bookings.map(booking => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-image">
                        <img src={booking.propertyImage} alt={booking.propertyName} />
                        <div className={`booking-status ${booking.status}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>
                      <div className="booking-details">
                        <div className="booking-header">
                          <h3 className="booking-property">{booking.propertyName}</h3>
                          <div className="booking-id">Booking ID: {booking.id}</div>
                        </div>
                        <div className="booking-info">
                          <div className="info-row">
                            <span className="info-label">Check-in</span>
                            <span className="info-value">{formatDate(booking.checkIn)}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Check-out</span>
                            <span className="info-value">{formatDate(booking.checkOut)}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Guests</span>
                            <span className="info-value">{booking.guests} Guests, {booking.rooms} Room</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Booked On</span>
                            <span className="info-value">{formatDate(booking.bookingDate)}</span>
                          </div>
                        </div>
                        <div className="booking-footer">
                          <div className="booking-price">
                            <span className="price-label">Total Amount</span>
                            <span className="price-amount">₹{booking.totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="booking-actions">
                            <button className="action-btn view-invoice">
                              <FaFileInvoice /> View Invoice
                            </button>
                            <button className="action-btn modify-booking">
                              Modify Booking
                            </button>
                            {booking.status === 'upcoming' && (
                              <button className="action-btn cancel-booking">
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2 className="tab-title">
                  <FaHeart /> My Wishlist
                </h2>
                <button className="clear-btn">
                  <FaTrash /> Clear All
                </button>
              </div>

              <div className="wishlist-grid">
                {wishlist.length === 0 ? (
                  <div className="empty-state">
                    <FaHeart className="empty-icon" />
                    <h3>Your wishlist is empty</h3>
                    <p>Save properties you love by clicking the heart icon!</p>
                    <button className="explore-btn" onClick={() => navigate('/')}>
                      Explore Properties
                    </button>
                  </div>
                ) : (
                  wishlist.map(item => (
                    <div key={item.id} className="wishlist-card">
                      <div className="wishlist-image">
                        <img src={item.image} alt={item.name} />
                        <button className="remove-wishlist">
                          <FaTimes />
                        </button>
                      </div>
                      <div className="wishlist-info">
                        <h3 className="wishlist-name">{item.name}</h3>
                        <div className="wishlist-location">
                          <FaMapMarkerAlt /> {item.location}
                        </div>
                        <div className="wishlist-rating">
                          <FaStar /> {item.rating}
                        </div>
                        <div className="wishlist-price">
                          <span className="price-label">Starting from</span>
                          <span className="price-amount">₹{item.price.toLocaleString()}/night</span>
                        </div>
                        <div className="wishlist-actions">
                          <button className="book-btn">
                            Book Now
                          </button>
                          <button className="view-btn">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2 className="tab-title">
                  <FaCreditCard /> Payment Methods
                </h2>
                <button className="add-card-btn">
                  <FaCreditCard /> Add New Card
                </button>
              </div>

              <div className="payment-cards">
                <div className="saved-card">
                  <div className="card-icon">
                    <FaCreditCard />
                  </div>
                  <div className="card-info">
                    <h4>Visa **** 1234</h4>
                    <p>Expires 12/25 • Primary</p>
                  </div>
                  <button className="card-action">Remove</button>
                </div>

                <div className="saved-card">
                  <div className="card-icon">
                    <FaCreditCard />
                  </div>
                  <div className="card-info">
                    <h4>Mastercard **** 5678</h4>
                    <p>Expires 10/24</p>
                  </div>
                  <button className="card-action">Set as Primary</button>
                </div>
              </div>

              <div className="payment-history">
                <h3>Payment History</h3>
                <div className="history-table">
                  <div className="table-header">
                    <div className="table-cell">Date</div>
                    <div className="table-cell">Description</div>
                    <div className="table-cell">Amount</div>
                    <div className="table-cell">Status</div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">15 Feb 2024</div>
                    <div className="table-cell">Grand Luxury Resort Booking</div>
                    <div className="table-cell">₹26,997</div>
                    <div className="table-cell">
                      <span className="status-badge completed">Completed</span>
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">10 Feb 2024</div>
                    <div className="table-cell">Beachfront Villa Deposit</div>
                    <div className="table-cell">₹15,000</div>
                    <div className="table-cell">
                      <span className="status-badge pending">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2 className="tab-title">
                  <FaShieldAlt /> Account Security
                </h2>
              </div>

              <div className="security-settings">
                <div className="security-card">
                  <div className="card-header">
                    <FaKey className="card-icon" />
                    <div>
                      <h3>Password</h3>
                      <p>Last changed 3 months ago</p>
                    </div>
                  </div>
                  <button className="security-btn">
                    Change Password
                  </button>
                </div>

                <div className="security-card">
                  <div className="card-header">
                    <FaLock className="card-icon" />
                    <div>
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="security-card">
                  <div className="card-header">
                    <FaGlobe className="card-icon" />
                    <div>
                      <h3>Active Sessions</h3>
                      <p>Manage your logged-in devices</p>
                    </div>
                  </div>
                  <button className="security-btn">
                    View All Sessions
                  </button>
                </div>

                <div className="security-card">
                  <div className="card-header">
                    <FaBell className="card-icon" />
                    <div>
                      <h3>Login Alerts</h3>
                      <p>Get notified for new logins</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2 className="tab-title">
                  <FaCog /> Preferences
                </h2>
              </div>

              <div className="preference-settings">
                <div className="preference-card">
                  <h3>Communication Preferences</h3>
                  <div className="preference-options">
                    <label className="preference-option">
                      <input type="checkbox" defaultChecked />
                      <span>Email notifications</span>
                    </label>
                    <label className="preference-option">
                      <input type="checkbox" defaultChecked />
                      <span>SMS notifications</span>
                    </label>
                    <label className="preference-option">
                      <input type="checkbox" defaultChecked />
                      <span>Promotional offers</span>
                    </label>
                    <label className="preference-option">
                      <input type="checkbox" />
                      <span>Newsletter subscription</span>
                    </label>
                  </div>
                </div>

                <div className="preference-card">
                  <h3>Privacy Settings</h3>
                  <div className="preference-options">
                    <label className="preference-option">
                      <input type="checkbox" defaultChecked />
                      <span>Show profile to other users</span>
                    </label>
                    <label className="preference-option">
                      <input type="checkbox" />
                      <span>Allow reviews to be public</span>
                    </label>
                    <label className="preference-option">
                      <input type="checkbox" defaultChecked />
                      <span>Share data for personalized offers</span>
                    </label>
                  </div>
                </div>

                <div className="preference-card">
                  <h3>Booking Preferences</h3>
                  <div className="preference-form">
                    <div className="form-group">
                      <label>Default Currency</label>
                      <select className="form-select">
                        <option>Indian Rupee (₹)</option>
                        <option>US Dollar ($)</option>
                        <option>Euro (€)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Default Language</label>
                      <select className="form-select">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Default Time Zone</label>
                      <select className="form-select">
                        <option>IST (UTC+5:30)</option>
                        <option>UTC</option>
                        <option>PST (UTC-8)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;