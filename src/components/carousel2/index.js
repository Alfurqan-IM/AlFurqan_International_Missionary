import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../index.css";
import backgroundPic from "../../assets/slide1.png"; // Placeholder image

const CustomCarousel = ({ items }) => {
  const hasImages = items && items.length > 0;

  return (
    <div
      className="carousel-container"
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
                      <div className="design-title">Program Details</div>
                      <div className="program-section">
                        <ol className="program-list">
                          <li>
                            Arabic Language Study: Tuesday 7:00 PM - 9:00 PM
                          </li>
                          <li>
                            Ta’afiz Al-Quran: Thursday 7:00 PM - 9:00 PM,
                            Saturday/Sunday 7:45 AM - 10:30 PM
                          </li>
                          <li>
                            Vocational Courses: Monday & Wednesday 10:00 AM -
                            12:00 PM
                          </li>
                          <li>
                            Vocational Courses: Monday & Wednesday 10:00 AM -
                            12:00 PM
                          </li>
                          <li>
                            Ta’afiz Al-Quran: Thursday 7:00 PM - 9:00 PM,
                            Saturday/Sunday 7:45 AM - 10:30 PM
                          </li>
                        </ol>
                      </div>
                      <button className="register-button">
                        Learn More/Register
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
