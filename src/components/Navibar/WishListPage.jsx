// WishlistPage.jsx
import React from 'react';
import { useWishlist } from './WishList';
import { 
  FaHeart, FaStar, FaMapMarkerAlt, FaBed, 
  FaBath, FaTrash, FaShoppingCart, FaShare 
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './WishList.css';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist, getWishlistCount } = useWishlist();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Group by property type
  const groupedWishlist = wishlist.reduce((acc, property) => {
    if (!acc[property.type]) {
      acc[property.type] = [];
    }
    acc[property.type].push(property);
    return acc;
  }, {});

  const handleRemove = (id) => {
    if (window.confirm(t('Remove from wishlist?'))) {
      removeFromWishlist(id);
    }
  };

  const handleShareWishlist = () => {
    const wishlistText = wishlist.map(item => `${item.name} - $${item.price}/night`).join('\n');
    navigator.clipboard.writeText(`My Property Wishlist:\n${wishlistText}`);
    alert(t('Wishlist copied to clipboard!'));
  };

  const calculateTotal = () => {
    return wishlist.reduce((sum, item) => sum + item.price, 0);
  };

  const calculateAveragePrice = () => {
    return wishlist.length > 0 ? calculateTotal() / wishlist.length : 0;
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="empty-content">
          <FaHeart className="empty-heart" />
          <h2>{t('Your Wishlist is Empty')}</h2>
          <p>{t('Save properties you love to your wishlist. Browse our collection and click the heart icon!') || 'Save properties you love to your wishlist. Browse our collection and click the heart icon!'}</p>
          <a href="/" className="browse-btn">
            {t('Browse Properties') || 'Browse Properties'}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      {/* Header */}
      <div className="wishlist-header">
        <div className="header-top">
          <h1 className="wishlist-title">
            <FaHeart className="title-icon" />
            {t('My Wishlist')}
            <span className="wishlist-count">({getWishlistCount()})</span>
          </h1>
          <div className="header-actions">
            <button className="share-btn" onClick={handleShareWishlist}>
              <FaShare /> {t('Share')}
            </button>
            <button className="clear-btn" onClick={() => {
              if (window.confirm(t('Clear entire wishlist?'))) {
                clearWishlist();
              }
            }}>
              <FaTrash /> {t('Clear All')}
            </button>
          </div>
        </div>
        
        <div className="wishlist-stats">
          <div className="stat-card">
            <span className="stat-label">{t('totalProperties') || 'Total Properties'}</span>
            <span className="stat-value">{getWishlistCount()}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">{t('totalValue') || 'Total Value'}</span>
            <span className="stat-value">${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">{t('avgPrice') || 'Avg. Price/Night'}</span>
            <span className="stat-value">${calculateAveragePrice().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="wishlist-container">
        {Object.entries(groupedWishlist).map(([type, properties]) => (
          <div key={type} className="wishlist-group">
            <h2 className="group-title">
              {type.charAt(0).toUpperCase() + type.slice(1)}s ({properties.length})
            </h2>
            <div className="wishlist-grid">
              {properties.map(property => (
                <div key={property.id} className="wishlist-item">
                  <div className="item-image">
                    <img src={property.image} alt={property.name} />
                    {property.discount && (
                      <span className="discount-tag">-{property.discount}%</span>
                    )}
                    {property.featured && (
                      <span className="featured-tag">Featured</span>
                    )}
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemove(property.id)}
                      aria-label={t('Remove from wishlist')}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  
                  <div className="item-content">
                    <div className="item-header">
                      <div className="item-type">{property.type}</div>
                      <div className="item-rating">
                        <FaStar /> {property.rating} ({property.reviews})
                      </div>
                    </div>
                    
                    <h3 className="item-name">{property.name}</h3>
                    
                    <div className="item-location">
                      <FaMapMarkerAlt /> {property.location}
                    </div>
                    
                    <p className="item-description">{property.description}</p>
                    
                    <div className="item-details">
                      <span><FaBed /> {property.beds} {t('beds') || 'beds'}</span>
                      <span><FaBath /> {property.baths} {t('baths') || 'baths'}</span>
                    </div>
                    
                    <div className="item-footer">
                      <div className="item-price">
                        <div className="current-price">
                          <span className="currency">$</span>
                          <span className="amount">{property.price}</span>
                          <span className="period">/{t('night') || 'night'}</span>
                        </div>
                        {property.discount && (
                          <div className="original-price">
                            ${Math.round(property.price / (1 - property.discount/100))}
                          </div>
                        )}
                      </div>
                      
                      <div className="item-actions">
                        <button className="book-btn"
                          onClick={() => navigate(`/book-now/${property.id}`, { 
                            state: { property } 
                          })}
                        >
                          <FaShoppingCart /> {t('Book Now')}
                        </button>
                        <button 
                          className="remove-wishlist-btn"
                          onClick={() => handleRemove(property.id)}
                        >
                          <FaHeart /> {t('Remove')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Sidebar */}
      <div className="wishlist-summary">
        <div className="summary-card">
          <h3>{t('Wishlist Summary')}</h3>
          
          <div className="summary-items">
            {wishlist.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-info">
                  <h4>{item.name}</h4>
                  <p className="summary-price">${item.price}/{t('night') || 'night'}</p>
                </div>
                <button 
                  className="summary-remove"
                  onClick={() => handleRemove(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="summary-total">
            <div className="total-row">
              <span>{t('totalProperties') || 'Total Properties'}:</span>
              <span>{getWishlistCount()}</span>
            </div>
            <div className="total-row">
              <span>{t('totalValue') || 'Total Value'}:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span>{t('avgPerNight') || 'Avg. per night'}:</span>
              <span>${calculateAveragePrice().toFixed(2)}</span>
            </div>
          </div>
          
          <button className="checkout-btn">
            {t('bookSelected') || 'Book Selected Properties'}
          </button>
          
          <div className="summary-actions">
            <button className="continue-shopping" onClick={() => window.location.href = '/'}>
              ← {t('continueShopping') || 'Continue Shopping'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;