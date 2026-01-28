import { useState } from "react";
import "./SearchArea.css";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt, FaUserFriends, FaMapMarkerAlt, FaBuilding, FaCity, FaGlobeAmericas, FaLandmark, FaMonument } from "react-icons/fa";

const SearchArea = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    children: 0,
  });

  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuestChange = (type, operation) => {
    setSearchParams(prev => {
      const newValue = operation === 'increase' ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      
      if (type === 'rooms' && newValue < 1) return prev;
      
      return {
        ...prev,
        [type]: newValue
      };
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching with parameters:", searchParams);
    // Submit form logic here
  };

  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateString) => {
    if (!dateString) return "Add dates";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="search-area">
      <div className="search-container">
        <h2 className="search-title">{t("Find Your Perfect Stay")}</h2>
        <p className="search-subtitle">{t("Book hotels, apartments, and vacation rentals worldwide")}</p>
        
        <form className="search-form" onSubmit={handleSearch}>
          {/* First Row: Destination Only */}
          <div className="search-row first-row">
            <div className="search-field destination-field">
              <div className="field-icon">
                <FaMapMarkerAlt />
              </div>
              <input
                type={t("text")}
                name={t("destination")}
                placeholder={t("Where do you want to go?")}
                value={searchParams.destination}
                onChange={handleInputChange}
                className="search-input"
                autoComplete="off"
              />
              <span className="field-label">{t("Destination")}</span>
              <button type="submit" className="search-icon-btn" aria-label={t("Search")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Second Row: Dates & Guests */}
          <div className="search-row second-row">
            {/* Check-in Date */}
            <div className="search-field date-field checkin-field">
              <div className="field-icon">
                <FaCalendarAlt />
              </div>
              <input
                type="date"
                name="checkIn"
                value={searchParams.checkIn}
                onChange={handleInputChange}
                min={today}
                className="search-input date-input"
                required
              />
              <span className="field-label">Check in</span>
              <div className="date-display">
                {formatDate(searchParams.checkIn)}
              </div>
            </div>

            {/* Check-out Date */}
            <div className="search-field date-field checkout-field">
              <div className="field-icon">
                <FaCalendarAlt />
              </div>
              <input
                type="date"
                name="checkOut"
                value={searchParams.checkOut}
                onChange={handleInputChange}
                min={searchParams.checkIn || today}
                className="search-input date-input"
                required
              />
              <span className="field-label">Check out</span>
              <div className="date-display">
                {formatDate(searchParams.checkOut)}
              </div>
            </div>

            {/* Rooms & Guests - Add position relative here */}
            <div className="search-field guest-field" style={{position: 'relative'}} onClick={() => setShowGuestDropdown(!showGuestDropdown)}>
              <div className="field-icon">
                <FaUserFriends />
              </div>
              <div className="guest-summary">
                <div className="guest-stats">
                  <span className="guest-stat">
                    <strong>{searchParams.rooms}</strong> room{searchParams.rooms > 1 ? 's' : ''}
                  </span>
                  <span className="guest-stat">
                    <strong>{searchParams.adults}</strong> adult{searchParams.adults > 1 ? 's' : ''}
                  </span>
                  {searchParams.children > 0 && (
                    <span className="guest-stat">
                      <strong>{searchParams.children}</strong> child{searchParams.children > 1 ? 'ren' : ''}
                    </span>
                  )}
                </div>
              </div>
              <span className="field-label">Rooms & Guests</span>

              {/* Guest Dropdown - Higher z-index */}
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
                        disabled={searchParams.rooms <= 1}
                      >
                        −
                      </button>
                      <span className="counter-value">{searchParams.rooms}</span>
                      <button 
                        type="button" 
                        className="counter-btn"
                        onClick={() => handleGuestChange('rooms', 'increase')}
                        disabled={searchParams.rooms >= 10}
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
                        disabled={searchParams.adults <= 1}
                      >
                        −
                      </button>
                      <span className="counter-value">{searchParams.adults}</span>
                      <button 
                        type="button" 
                        className="counter-btn"
                        onClick={() => handleGuestChange('adults', 'increase')}
                        disabled={searchParams.adults >= 10}
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
                        disabled={searchParams.children <= 0}
                      >
                        −
                      </button>
                      <span className="counter-value">{searchParams.children}</span>
                      <button 
                        type="button" 
                        className="counter-btn"
                        onClick={() => handleGuestChange('children', 'increase')}
                        disabled={searchParams.children >= 10}
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
          </div>
        </form>

        {/* Quick Suggestions - Lower z-index */}
        <div className="quick-suggestions">
          <h3 className="suggestions-title">
            <FaGlobeAmericas className="title-icon" />
            Popular destinations:
          </h3>
          <div className="suggestions-grid">
            <button className="suggestion-card">
              <div className="suggestion-icon">
                <FaBuilding />
              </div>
              <div className="suggestion-info">
                <span className="suggestion-city">Dubai</span>
                <span className="suggestion-country">UAE</span>
              </div>
            </button>
            <button className="suggestion-card">
              <div className="suggestion-icon">
                <FaLandmark />
              </div>
              <div className="suggestion-info">
                <span className="suggestion-city">Paris</span>
                <span className="suggestion-country">France</span>
              </div>
            </button>
            <button className="suggestion-card">
              <div className="suggestion-icon">
                <FaCity />
              </div>
              <div className="suggestion-info">
                <span className="suggestion-city">Tokyo</span>
                <span className="suggestion-country">Japan</span>
              </div>
            </button>
            <button className="suggestion-card">
              <div className="suggestion-icon">
                <FaMonument />
              </div>
              <div className="suggestion-info">
                <span className="suggestion-city">New York</span>
                <span className="suggestion-country">USA</span>
              </div>
            </button>
            <button className="suggestion-card">
              <div className="suggestion-icon">
                <FaBuilding />
              </div>
              <div className="suggestion-info">
                <span className="suggestion-city">London</span>
                <span className="suggestion-country">UK</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;