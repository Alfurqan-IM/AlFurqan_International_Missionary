import React from "react";
import "./programcard.css";

const ProgramCard = ({
  imageSrc,
  title,
  description,
  time,
  date,
  startDate,
  endDate,
}) => {
  return (
    <div className="program-card">
      <div className={"programcard_img_container"}>
        <img src={imageSrc} alt="Program" className="program-image" />
      </div>
      <div className="program-info">
        <div className="program-title">{title}</div>
        <div className="program-description">{description}</div>
        <div className="program-schedule">
          <div className="program">Date : {time}</div>
          <div className="program">Start Date : {startDate}</div>
          <div className="program">End Date : {endDate}</div>
          <div className="program">Year : {date}</div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
