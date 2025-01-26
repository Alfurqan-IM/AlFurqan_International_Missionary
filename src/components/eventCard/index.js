import React, { useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import backupImg from "../../assets/quran.png";

const EventCard = ({ event, loading }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription =
    event?.description?.length > 100
      ? `${event?.description.substring(0, 100)}... `
      : event?.description;

  return (
    <div className={styles.card}>
      {loading ? (
        <>loaidng program...</>
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <img
              src={event?.programmesimages?.[0]?.image0 || backupImg}
              alt={event?.name}
              className={styles.image}
            />
          </div>

          <div className={styles.textContainer}>
            <div
              className={
                event?.heading?.length > 20 ? styles.title2 : styles.title
              }
            >
              {event?.heading}
            </div>
            <div className={styles.description}>
              {showFullDescription ? event?.description : truncatedDescription}
              {event?.description?.length > 80 && (
                <span
                  className={styles.readMore}
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? " Show Less" : " Read more"}
                </span>
              )}
            </div>

            <Link
              to={`/programs/${event.programme_id}`}
              className={styles.button}
            >
              Learn More
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default EventCard;
