import React from "react";
import styles from "./aboutUs.module.css"; // Import CSS module
import { useEffect } from "react";

const AboutUsSection = () => {
  useEffect(() => {
    // Check if the script is already loaded
    const existingScript = document.getElementById(
      "donorbox-popup-button-installer"
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://donorbox.org/install-popup-button.js";
      script.defer = true;
      script.id = "donorbox-popup-button-installer";

      // Donorbox attributes
      script.setAttribute(
        "data-href",
        "https://donorbox.org/free-ramadan-iftar"
      );
      script.setAttribute("data-button-cta", "Donate");
      script.setAttribute(
        "data-style",
        "background:#085A36 ; color: #fff; text-decoration: none; font-family: Verdana, sans-serif; display: flex; gap: 8px; width: fit-content; font-size: 16px; border-radius: 8px 8px 0 0; line-height: 24px; position: fixed; top: 50%; transform-origin: center; z-index: 9999; overflow: hidden; padding: 10px 22px 10px 18px; right: 22px; transform: translate(+50%, -50%) rotate(-90deg)"
      );
      script.setAttribute(
        "data-img-src",
        "https://donorbox.org/images/white_logo.svg"
      );

      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className={styles.aboutUsSection}>
      {/* About Us Header and Description */}
      <div className={styles.aboutUsTop}>
        <div className={styles.sectionTitle}>ABOUT US</div>
        <div className={styles.description}>
          {/* Al-Fur’qan Institute Missionary was started by a group of highly
          dedicated and passionate Muslims, with a focus on knowledge and
          scholarship. Our vision is to contribute to local communities by
          creating compassionate leaders and influential educators. At our core,
          our Islamic charity is focused on paying it forward. Our goal is to
          help build men and women who will take the initiative to help others
          throughout the World. When we work together and build strong
          communities, we create a better world. */}
          Al-Fur'qan International Missionary (AIM) is a Section 501(c)(3)
          organization registered in the State of Michigan, USA. We distinguish
          ourselves through our integrated approach to spiritual growth and
          community service.
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
                    We AIM serves communities
                    worldwide through authentic Islamic education and
                    compassionate service, empowering individuals and families
                    while promoting peace, unity, and social harmony rooted in
                    integrity and excellence.
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>VISION STATEMENT</div>
                  <div className={styles.cardText}>
                    To build a world where hearts and communities are united
                    through authentic Islamic knowledge and compassionate
                    service, transcending cultural boundaries and empowering
                    people everywhere to live with purpose, dignity, and
                    understanding.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
