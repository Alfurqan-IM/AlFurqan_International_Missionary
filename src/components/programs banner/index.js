import React from "react";
import "./banner.css";

const ProgramsBanner = ({ imageSrc, title, description, loading }) => {
  return (
    <div className="banner-container">
      <img src={imageSrc} alt={title} className="banner-image" />
      {loading ? (
        <>loading description...</>
      ) : (
        <div className="banner-overlay">
          <div className="banner-title">{title}</div>
          <div className="banner-description">{description}</div>
        </div>
      )}
    </div>
  );
};

export default ProgramsBanner;
