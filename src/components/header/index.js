import React from "react";
import styles from "./index.module.css"; // Import the CSS module
import aimLogo from "../../assets/aim logo.png";

const Header = () => {
  return (
    <header className={styles.headerd}>
      <div className={styles.logo}>
        <img
          src={aimLogo} // Replace with the path to your logo
          alt="Al-Furqan Institute Missionary"
          className={styles.logoImage}
        />
        <div className={styles.logoText}>
          <div className={styles.mainText}>AL-FUR'QAN</div>
          <div className={styles.subText}>International Missionary</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
