import { useState } from "react";
import ImageUpload from "../../components/owner/ImageUpload";
import AvailabilityToggle from "../../components/owner/AvailabilityToggle";
import "./ListProperty.css";

const ListProperty = () => {
  const [images, setImages] = useState([]);
  const [available, setAvailable] = useState(true);

  return (
    <div className="owner-page">
      <div className="owner-container">

        {/* HEADER */}
        <div className="owner-header">
          <h1>List Your Property</h1>
          <p>Share details about your property to attract guests</p>
        </div>

        {/* IMAGES */}
        <div className="owner-card">
          <h2>Property Images</h2>
          <p className="card-subtitle">Upload 5–10 high quality images</p>
          <ImageUpload images={images} setImages={setImages} />
        </div>

        {/* DETAILS */}
        <div className="owner-card">
          <h2>Property Details</h2>
          <p className="card-subtitle">Basic information about your property</p>

          <input type="text" placeholder="Property Name" />
          <textarea placeholder="Address" rows="3"></textarea>
          <textarea placeholder="Description" rows="4"></textarea>
        </div>

        {/* PRICING */}
        <div className="owner-card">
          <h2>Pricing and Availability</h2>
          <p className="card-subtitle">Set price and availability dates</p>

          <div className="pricing-grid">
            <input type="text" placeholder="₹ / $ per night" />
            <input type="date" />
            <input type="date" />
          </div>
        </div>

        {/* STATUS */}
        <div className="owner-card">
          <h2>Property Status</h2>
          <p className="card-subtitle">Control property availability</p>
          <AvailabilityToggle value={available} onChange={setAvailable} />
        </div>

        {/* SUBMIT */}
        <button className="primary-btn">Post Property</button>

      </div>
    </div>
  );
};

export default ListProperty;
