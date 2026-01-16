import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../index.css";
import backgroundPic from "../../assets/quran.png"; // Placeholder image

const CustomCarousel = ({ items }) => {
  const hasImages = items && items.length > 0;

  return (
    <div
      className="carousel-container2"
      style={{
        backgroundImage: hasImages ? "none" : `url(${backgroundPic})`, // Temporary background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="swiper-container">
        {hasImages ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="carousel-slide"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                  }}
                >
                  <div className="carousel-content">
                    <div className="carousel-text">
                      <div className="carousel-title">{item.title}</div>
                      <div className="carousel-description">
                        {item.description}
                      </div>
                    </div>
                    <div className="permanent-design">
                      <div className="design-title">Details</div>
                      <div className="program-section">
                        <ul className="program-list">
                          <li>
                            <strong>Schedule:</strong> {item.time}
                          </li>
                          {/* <li>
                            <strong>Academic Year:</strong> {item.year}
                          </li> */}
                          <li>
                            <strong>Duration:</strong>{" "}
                            {new Date(item.start_date).toLocaleDateString()} –{" "}
                            {new Date(item.end_date).toLocaleDateString()}
                          </li>
                        </ul>
                      </div>

                      <button className="register-button">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="loading-placeholder">
            <p>Loading content...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel;
