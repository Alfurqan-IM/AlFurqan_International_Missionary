import React from "react";
import logo from "../../assets/aim logo.png";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const Footer = () => {
  const styles = {
    footerContainer: {
      backgroundColor: "rgba(8, 90, 54, 1)", // Dark green background
      color: "#fff", // White text
      padding: "30px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
    },
    topSection: {
      display: "flex",
      padding: "2%",
      gap: "20px", // Add gap between columns
    },
    leftColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
    logo: {
      borderRadius: "50%",
      width: "80px",
      height: "80px",
      marginBottom: "15px",
    },
    icon: {
      fontSize: "20px",
      color: "#ffffff",
      cursor: "pointer",
      border: "none",
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      background: "rgba(5, 156, 90, 1)",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "20px",
    },
    footerButton: {
      padding: "4px 12px",
      backgroundColor: "rgba(5, 156, 90, 1)",
      color: "#ffffff", // Green text
      border: "1px solid #fff",
      fontWeight: 600,
      fontSize: "14px",
      fontFamily: "Inknut Antiqua",
      cursor: "pointer",
      textDecoration: "none",
      marginTop: "20px",
    },
    middleColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "10px",
      flex: 1,
    },
    menuItem: {
      color: "rgb(214, 217, 209)",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "600",
      fontFamily: "Inknut Antiqua",
      lineHeight: "42px",
    },
    rightColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      flex: 1,
    },
    input: {
      padding: "18px 10px",
      border: "1px solid #ddd",
      fontSize: "14px",
      width: "80%",
      marginBottom: "20px",
      outline: "rgba(5, 156, 90, 1)",
    },
    submitButton: {
      padding: "8px 38px",
      backgroundColor: "rgba(5, 156, 90, 1)",
      color: "#ffffff",
      border: "1px solid #fff",
      fontSzie: "18px",
      cursor: "pointer",
      fontWeight: "600",
      marginBottom: "20px",
      fontFamily: "Inknut Antiqua",
    },
    bottomSection: {
      textAlign: "center",
      marginTop: "20px",
      color: "#fff",
      fontSize: "14px",
      paddingTop: "10px",
    },
    imageContainer: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      marginBottom: "10px",
    },
    // Add media queries for responsiveness
    responsive: {
      topSection: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "20px",
      },
      column: {
        width: "100%",
        alignItems: "flex-start",
      },
      menuItem: {
        fontSize: "12px",
      },
      input: {
        width: "80%",
      },
    },
  };

  // Check if the screen size is small
  const isSmallScreen = window.innerWidth < 768;
  const responsiveStyles = isSmallScreen ? styles.responsive : {};

  return (
    <div style={styles.footerContainer}>
      {/* Top Section */}
      <div
        style={{
          ...styles.topSection,
          ...responsiveStyles.topSection,
        }}
      >
        {/* Left Column */}
        <div
          style={{
            ...styles.leftColumn,
            ...responsiveStyles.column,
          }}
        >
          <div style={styles.imageContainer}>
            <img src={logo} alt="Logo" style={styles.logo} />
          </div>
          <div style={{ marginBottom: "40px", marginTop: "20px" }}>
            <FacebookOutlined style={styles.icon} />
            <TwitterOutlined style={styles.icon} />
            <InstagramOutlined style={styles.icon} />
            <YoutubeOutlined style={styles.icon} />
          </div>
          <div>
            <a href="#donate" style={styles.footerButton}>
              Donate Now
            </a>
          </div>
        </div>

        {/* Middle Column */}
        <div
          style={{
            ...styles.middleColumn,
            ...responsiveStyles.column,
          }}
        >
          <a href="#home" style={styles.menuItem}>
            Home
          </a>
          <a href="#donations" style={styles.menuItem}>
            Donations
          </a>
          <a href="#careline" style={styles.menuItem}>
            Muslim Care Line
          </a>
          <a href="#contact" style={styles.menuItem}>
            Get In Touch
          </a>
          <a href="#blogs" style={styles.menuItem}>
            Blogs
          </a>
        </div>

        {/* Right Column */}
        <div
          style={{
            ...styles.rightColumn,
            ...responsiveStyles.column,
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              style={{ ...styles.input, ...responsiveStyles.input }}
            />
            <input
              type="email"
              placeholder="Email"
              style={{ ...styles.input, ...responsiveStyles.input }}
            />
            <textarea
              placeholder="Message"
              style={{
                ...styles.input,
                height: "100px",
                ...responsiveStyles.input,
              }}
            />
          </div>

          <div>
            <button style={styles.submitButton}>Submit</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottomSection}>
        © 2024 Al-Furqan Institute Michigan
      </div>
    </div>
  );
};

export default Footer;
