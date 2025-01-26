import React from "react";
import background from "../../assets/backgroundkettle.jpg";

const IslamicCommunitySection = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
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
        fontSize: "14px",
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
        What Our Islamic Community Is Working On
      </div>
      <div style={{ ...styles.paragraph, ...responsiveStyles.paragraph }}>
        Whether you're a current donor or looking forward to helping us in the
        future, we invite you to explore our current ongoing programs. Our goal
        is to provide accessible ways for Muslims to increase their faith,
        devotion, and knowledge of Islam, and to create unity among all groups
        of life.
      </div>
      <div>
        <button
          href="https://youtube.com" // Replace with the actual link
          style={{ ...styles.button, ...responsiveStyles.button }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#d4e4d4")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#eef5ef")}
        >
          Our Youtube
        </button>
      </div>
    </div>
  );
};

export default IslamicCommunitySection;
