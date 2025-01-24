import React from "react";
import styles from "./index.module.css";

const EventCard = ({ event }) => {
  return (
    <div className={styles.card}>
      <div style={{ display: "flex" }}>
        <img src={event.image} alt={event.name} className={styles.image} />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.title}>{event.name}</div>
        <div className={styles.description}>{event.description}</div>
        <div>
          <button href={event.url} className={styles.button}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
