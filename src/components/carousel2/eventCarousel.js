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
          maxHeight: "800px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              color: "white",
              marginBottom: "20px",
              textAlign: "center",
              padding: "4px 12px",
              background: "rgba(8, 90, 54, 1)",
              borderRadius: "8px",
              fontSize: "0.8rem",
            }}
          >
            Our Upcoming Events
          </div>
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
                  onMouseEnter={(e) => {
                    const contentDiv =
                      e.currentTarget.querySelector(".slide-content");
                    if (contentDiv) {
                      contentDiv.style.opacity = 1;
                      contentDiv.style.pointerEvents = "auto";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const contentDiv =
                      e.currentTarget.querySelector(".slide-content");
                    if (contentDiv) {
                      contentDiv.style.opacity = 0;
                      contentDiv.style.pointerEvents = "none";
                    }
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${item.image_url})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "100%",
                      backgroundRepeat: "no-repeat",
                    }}
                  />

                  {/* Bottom Content - Hidden by default, shows on hover */}
                  <div
                    className="slide-content"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "25vw",
                      width: "fit-content",
                      background: "transparent",
                      color: "white",
                      textAlign: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none",
                    }}
                  >
                    <h5
                      style={{
                        marginBottom: "5px",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        background: "rgba(0,0,0,0.5)",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        display: "inline-block",
                      }}
                    >
                      {item.title}
                    </h5>
                    <div>
                      <a
                        href={item.event_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          backgroundColor: "#085a36",
                          color: "white",
                          fontSize: "0.8rem",
                          textDecoration: "none",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#0a6e42";
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.boxShadow =
                            "0 4px 15px rgba(0,0,0,0.4)";
                          e.target.style.borderColor = "rgba(255,255,255,0.6)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#085a36";
                          e.target.style.transform = "scale(1)";
                          e.target.style.boxShadow =
                            "0 2px 5px rgba(0,0,0,0.2)";
                          e.target.style.borderColor = "rgba(255,255,255,0.3)";
                        }}
                      >
                        Register
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            className="loading-placeholder"
            style={{ color: "white", textAlign: "center" }}
          >
            <h3>Loading content...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel2;
