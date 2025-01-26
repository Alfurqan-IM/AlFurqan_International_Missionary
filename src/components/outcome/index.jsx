import React from "react";
import "./outcome.css";
import quran from "../../assets/Quran icon.png";
import mosque from "../../assets/Mosque.png";
import honest from "../../assets/Honesty.png";

const OutcomeCard = ({ title, outcome1, outcome2, outcome3, loading }) => {
  return (
    <div className="outcome-card">
      {loading ? (
        <>loading outcome...</>
      ) : (
        <div className="outcome-overlay">
          <div className="outcome-overlay_padding">
            <div className="outcome-title">Outcome of {title} </div>
            <div className="outcome-items">
              <div className="outcome-item">
                <img
                  src={honest}
                  alt="Outcome Icon 1"
                  className="outcome-icon"
                />
                <div className="outcome-subtitle">{outcome1}</div>
              </div>
              <div className="outcome-item">
                <img
                  src={quran}
                  alt="Outcome Icon 2"
                  className="outcome-icon"
                />
                <div className="outcome-subtitle">{outcome2}</div>
              </div>
              <div className="outcome-item">
                <img
                  src={mosque}
                  alt="Outcome Icon 3"
                  className="outcome-icon"
                />
                <div className="outcome-subtitle">{outcome3}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutcomeCard;
