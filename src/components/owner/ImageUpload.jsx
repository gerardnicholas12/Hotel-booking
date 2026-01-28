import "./ImageUpload.css";

const ImageUpload = ({ images, setImages }) => {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files].slice(0, 10));
  };

  return (
    <div>
      <label className="upload-btn">
        Upload Images
        <input type="file" multiple accept="image/*" onChange={handleChange} />
      </label>

      <div className="preview-grid">
        {images.map((img, i) => (
          <div className="preview-item" key={i}>
            <img src={URL.createObjectURL(img)} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
