import { useState, useEffect } from "react";
import "./PropertyList.css";
import { FaStar, FaMapMarkerAlt, FaBed, FaBath, FaWifi, FaParking, FaSwimmingPool } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import propertiesData from "./PropertyList.json";

// Sample data - in a real app, this would come from an API
const initialProperties = [
  ...propertiesData
];

const PropertyList = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState(initialProperties);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Filter properties based on selected filter
  const filteredProperties = properties.filter(property => {
    if (filter === "all") return true;
    if (filter === "featured") return property.featured;
    return property.type.toLowerCase() === filter;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch(sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const getAmenityIcon = (amenity) => {
    switch(amenity) {
      case "wifi": return <FaWifi />;
      case "pool": return <FaSwimmingPool />;
      case "parking": return <FaParking />;
      case "spa": return <FaBath />;
      case "kitchen": return "🍳";
      case "gym": return "💪";
      case "beach": return "🏖️";
      case "fireplace": return "🔥";
      default: return "✓";
    }
  };

  return (
    <div className="property-list">
      <div className="property-list-container">
        <div className="property-list-header">
          <div className="header-left">
            <h2 className="property-list-title">{t("discoverProperties") || "Discover Amazing Properties"}</h2>
            <p className="property-list-subtitle">
              {t("propertiesFound", { count: sortedProperties.length }) || `${sortedProperties.length} properties found`}
            </p>
          </div>
          
          <div className="header-right">
            <div className="filter-controls">
              <div className="filter-group">
                <label>{t("filterBy") || "Filter by:"}</label>
                <select 
                  className="filter-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">{t("allProperties") || "All Properties"}</option>
                  <option value="hotel">{t("hotels") || "Hotels"}</option>
                  <option value="apartment">{t("apartments") || "Apartments"}</option>
                  <option value="villa">{t("villas") || "Villas"}</option>
                  <option value="resort">{t("resorts") || "Resorts"}</option>
                  <option value="featured">{t("featured") || "Featured"}</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>{t("sortBy") || "Sort by:"}</label>
                <select 
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">{t("featured") || "Featured"}</option>
                  <option value="price-low">{t("priceLowHigh") || "Price: Low to High"}</option>
                  <option value="price-high">{t("priceHighLow") || "Price: High to Low"}</option>
                  <option value="rating">{t("topRated") || "Top Rated"}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="properties-grid">
          {sortedProperties.map(property => (
            <div className="property-card" key={property.id}>
              {/* Property Image with Badges */}
              <div className="property-image-container">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="property-image"
                  loading="lazy"
                />
                
                {/* Discount Badge */}
                {property.discount && (
                  <div className="discount-badge">
                    -{property.discount}%
                  </div>
                )}
                
                {/* Featured Badge */}
                {property.featured && (
                  <div className="featured-badge">
                    {t("featured") || "Featured"}
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button className="wishlist-btn">
                  ♡
                </button>
              </div>

              {/* Property Info */}
              <div className="property-info">
                <div className="property-header">
                  <div className="property-type">
                    {property.type}
                  </div>
                  <div className="property-rating">
                    <FaStar className="star-icon" />
                    <span className="rating-value">{property.rating}</span>
                    <span className="reviews">({property.reviews})</span>
                  </div>
                </div>

                <h3 className="property-name">{property.name}</h3>
                
                <div className="property-location">
                  <FaMapMarkerAlt className="location-icon" />
                  <span>{property.location}</span>
                </div>

                <p className="property-description">
                  {property.description}
                </p>

                {/* Amenities */}
                <div className="property-amenities">
                  {property.amenities.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="amenity-item" title={amenity}>
                      {getAmenityIcon(amenity)}
                      <span className="amenity-text">{amenity}</span>
                    </span>
                  ))}
                  {property.amenities.length > 4 && (
                    <span className="amenity-more">
                      +{property.amenities.length - 4} more
                    </span>
                  )}
                </div>

                {/* Property Details */}
                <div className="property-details">
                  <div className="detail-item">
                    <FaBed className="detail-icon" />
                    <span>{property.beds} {t("beds") || "beds"}</span>
                  </div>
                  <div className="detail-item">
                    <FaBath className="detail-icon" />
                    <span>{property.baths} {t("baths") || "baths"}</span>
                  </div>
                  <div className="detail-item">
                    <span className="property-size">• • •</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="property-footer">
                  <div className="price-section">
                    <div className="price-main">
                      <span className="price-currency">$</span>
                      <span className="price-amount">{property.price}</span>
                      <span className="price-period">/night</span>
                    </div>
                    {property.discount && (
                      <div className="price-original">
                        ${Math.round(property.price / (1 - property.discount/100))}
                      </div>
                    )}
                  </div>
                  
                  <button className="book-now-btn">
                    {t("bookNow") || "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProperties.length === 0 && (
          <div className="no-results">
            <p>{t("noPropertiesFound") || "No properties found matching your criteria."}</p>
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setFilter("all");
                setSortBy("featured");
              }}
            >
              {t("resetFilters") || "Reset Filters"}
            </button>
          </div>
        )}

        <div className="load-more-container">
          <button className="load-more-btn">
            {t("loadMore") || "Load More Properties"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;