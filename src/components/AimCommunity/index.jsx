import React from "react";
import background from "../../assets/backgroundkettle.jpg";

const IslamicCommunitySection = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff", // White text color
      padding: "50px 20px",
      textAlign: "center",
      backgroundImage: `linear-gradient(to right, rgba(1, 1, 1, 0.9), rgba(20, 20, 20, 0.5)), url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      minHeight: "300px",
      overflow: "hidden",
    },
    heading: {
      fontSize: "20px",
      fontWeight: "600",
      lineHeight: "53px",
      marginBottom: "20px",
      textTransform: "uppercase",
    },
    paragraph: {
      fontSize: "18px",
      lineHeight: "22px",
      marginBottom: "30px",
      width: "50%",
      margin: "15px auto",
      fontWeight: "400",
    },
    button: {
      padding: "6px 18px",
      backgroundColor: "rgba(243, 236, 228, 1)", // Light greenish button background
      borderRadius: "5px",
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "600",
      lineHeight: "40px",
      color: "rgba(8, 90, 54, 1)",
      transition: "all 0.3s ease",
      marginTop: "40px",
      fontFamily: "Inknut Antiqua",
    },
    responsive: {
      container: {
        padding: "20px 10px",
        minHeight: "100px",
      },
      heading: {
        fontSize: "16px",
        lineHeight: "40px",
        width: "90%",
        textAlign: "center",
        padding: "2%",
      },
      paragraph: {
        fontSize: "12px",
        lineHeight: "20px",
        width: "86%",
      },
      button: {
        fontSize: "13px",
        padding: "2px 10px",
        border: "none",
      },
    },
  };

  // Dynamically adjust styles for screens below 768px
  const isSmallScreen = window.innerWidth < 768;
  const responsiveStyles = isSmallScreen ? styles.responsive : {};

  return (
    <div style={{ ...styles.container, ...responsiveStyles.container }}>
      <div style={{ ...styles.heading, ...responsiveStyles.heading }}>
        Driven by Purpose, Guided by Faith.
      </div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/bDrRJ_7nbMM?si=bIS6HdUALSW9g3H5"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default IslamicCommunitySection;
