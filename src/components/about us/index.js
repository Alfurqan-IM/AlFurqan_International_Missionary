import React from "react";
import styles from "./aboutUs.module.css"; // Import CSS module

const AboutUsSection = () => {
  return (
    <section className={styles.aboutUsSection}>
      {/* About Us Header and Description */}
      <div className={styles.aboutUsTop}>
        <div className={styles.sectionTitle}>ABOUT US</div>
        <div className={styles.description}>
          Al-Fur’qan Institute Missionary was started by a group of highly
          dedicated and passionate Muslims, with a focus on knowledge and
          scholarship. Our vision is to contribute to local communities by
          creating compassionate leaders and influential educators. At our core,
          our Islamic charity is focused on paying it forward. Our goal is to
          help build men and women who will take the initiative to help others
          throughout the World. When we work together and build strong
          communities, we create a better world.
        </div>
      </div>

      {/* Mission and Vision Statement */}
      <div className={styles.missionVisionSection_container}>
        <div className={styles.missionVisionSection}>
          <div className={styles.missionVisionSectionOverlay}>
            <div className={styles.missionVisionSectionOverlay_padding}>
              <div className={styles.sectionSubTitle}>
                OUR VISION/MISSION STATEMENT
              </div>
              <div className={styles.statement}>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>MISSION STATEMENT</div>
                  <div className={styles.cardText}>
                    Our mission is to nurture and empower individuals through
                    Islamic and academic education, fostering well-rounded role
                    models and vibrant communities. We provide diverse programs
                    for all ages, including Hifz, academics, and Islamic
                    studies, with a vision to expand globally through
                    initiatives like a boarding school.
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>VISION STATEMENT</div>
                  <div className={styles.cardText}>
                    We envision a harmonious community where individuals excel
                    academically and spiritually, embodying Islamic values.
                    Through comprehensive programs, we aim to empower people of
                    all ages to become compassionate leaders who positively
                    impact society and foster unity.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Button */}
      <div className={styles.donateButtonContainer}>
        <div>
          <button className={styles.donateButton}>Donate Now</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
