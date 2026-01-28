import "./AvailabilityToggle.css";

const AvailabilityToggle = ({ value, onChange }) => {
  return (
    <div className="status-toggle">
      <span>Unavailable</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
      <span>Available</span>
    </div>
  );
};

export default AvailabilityToggle;
