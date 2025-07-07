import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";
import backgroundPic from "../../assets/eventBg.jpg"; // fallback image

const CustomCarousel2 = ({ items }) => {
  const hasImages = items && items.length > 0;

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="carousel-container"
        style={{
          backgroundImage: hasImages ? "none" : `url(${backgroundPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "4%",
          height: "500px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div>
          <h2
            style={{
              color: "white",
              marginBottom: "20px",
              textAlign: "center",
              padding: "4px 12px",
              background: "rgba(8, 90, 54, 1)",
              borderRadius: "8px",
            }}
          >
            Register Below for our upcoming programs
          </h2>
        </div>
        {hasImages ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            loop
            style={{ width: "100%", height: "100%" }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${item.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />

                  {/* Bottom Content */}
                  <div
                    className="slide-content"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      textAlign: "center",
                      padding: "10px 20px",
                    }}
                  >
                    <h5 style={{ marginBottom: "5px" }}>{item.title}</h5>
                    <a
                      href={item.event_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="register-button"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="loading-placeholder">
            <h3>Loading content...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel2;
