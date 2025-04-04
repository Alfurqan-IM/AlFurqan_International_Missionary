import React from "react";
import "./aboutus.css";
import centralMosque from "../../assets/centralMosque.png";
import sunsetWalk from "../../assets/sunsetWalk.png";
import quranReading from "../../assets/quranRead.png";
import hand from "../../assets/handicon.png";
import comment from "../../assets/peoplecomment.png";
import backgroundImage from "../../assets/backgroundkettle.jpg";
import lovehand from "../../assets/lovehand.png";
import worldwide from "../../assets/world.png";
import group from "../../assets/group.png";
import stop from "../../assets/stop.png";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import Footer from "../../components/footer";

const AboutUs = () => {
  const cardData = [
    {
      title: "Educational Excellence",
      items: [
        "Islamic Studies Curriculum",
        "Classical Islamic Sciences",
        "Contemporary Applications",
        "Certificate Programs",
        "Weekend Seminars",
      ],
    },
    {
      title: "Professional Development",
      items: [
        "Leadership Training",
        "Business Ethics",
        "Career Guidance",
        "Entrepreneurship Skills",
      ],
    },
    {
      title: "Community Services",
      items: [
        "Social Support",
        "Family Counseling",
        "Youth Mentoring",
        "Marriage Services",
        "Crisis Intervention",
      ],
    },
    {
      title: "Cultural Programme",
      items: [
        "International Cultural Exchange",
        "Heritage Preservation",
        "Community Integration",
        "Interfaith Dialogue",
      ],
    },
    {
      title: "Spiritual Development",
      items: [
        "Worship Programs",
        "Daily Prayers",
        "Weekly Classes",
        "Ramadan Activities",
        "Hajj Preparation",
      ],
    },
    {
      title: "Personal Growth",
      items: [
        "Character Development",
        "Life Skills Training",
        "Spiritual Retreats",
        "Mental Wellness",
      ],
    },
  ];
  function Card({ title, items }) {
    return (
      <div className="about_card">
        <h3>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={"about_us_container"}>
      <Header />
      <PublicNav />
      <div className="about_us_banner-container">
        <img
          src={centralMosque}
          alt={"central mosques Pictures"}
          className="banner-image"
        />

        <div className="about_us_banner-overlay">
          <div className="about_us_banner-title">About Us</div>
        </div>
      </div>

      <div className="about_story-section">
        <img src={sunsetWalk} alt="Our Story" className="story-image" />
        <div className="about_story-text">
          <h3>OUR STORY</h3>
          <div className="about_write-up">
            Al-Fur'qan International Missionary (AIM) is a registered Section
            501(c)(3) nonprofit organization based in the State of Michigan,
            USA. It was founded by a group of devoted and passionate Muslims
            with a deep commitment to knowledge, scholarship, and community
            service. Our ambition is to empower communities by nurturing
            leaders, educators, and individuals with strong moral and
            intellectual foundations. We are dedicated to fostering meaningful
            change by building resilient and impactful communities that uplift
            lives, inspire transformation, and contribute to the greater good of
            humanity. Through education, outreach, and service, we strive to
            leave a lasting positive impact on society.
          </div>
        </div>
      </div>

      <div className="about_story-section">
        <div className="about_story-text">
          <h3>OUR GLOBAL VISION</h3>
          <div className="about_write-up">
            At Al-Fur'qan International Missionary (AIM), we bridge cultural
            boundaries and unite communities through Islamic knowledge and
            humanitarian service. Founded on the principle of "Service with
            Knowledge," our Missionary work stands as a beacon of Islamic
            education and community empowerment across continents.
          </div>
        </div>
        <img src={quranReading} alt="Global Vision" className="story-image" />
      </div>

      <section className="unique-approach">
        <h3>OUR UNIQUE APPROACH</h3>
        <p>
          We distinguish ourselves through our integrated approach to spiritual
          growth and community service
        </p>
        <div className="approach-grid">
          <div className="approach-item">
            <div className="approach-item-image">
              <img src={hand} alt="Global Vision" />
            </div>

            <h4>Global Knowledge Network</h4>
            <p>
              <ul>
                <li>
                  International Scholar Program: Direct access to renowned
                  Islamic scholars from prestigious institutions worldwide
                </li>
                <li>
                  Digital Learning Hub: 24/7 access to authenticated Islamic
                  knowledge through our state-of-the-art online platform
                </li>
                <li>
                  Multilingual Resources: Educational materials in English,
                  Arabic, Urdu, and Malay
                </li>
              </ul>
            </p>
          </div>
          <div className="approach-item">
            <div className="approach-item-image">
              <img src={comment} alt="Global Vision" />
            </div>

            <h4>Community Empowerment</h4>
            <p>
              <ul>
                <li>
                  Youth Leadership Academy: Developing tomorrow's Muslim leaders
                  through mentorship and practical training
                </li>
                <li>
                  Family Development Center: Strengthening family units through
                  counseling and educational support
                </li>
                <li>
                  Business Incubator: Supporting Muslim entrepreneurs with
                  Shariah-compliant business development resources
                </li>
              </ul>
            </p>
          </div>
          <div className="approach-item">
            <div className="approach-item-image">
              <img src={lovehand} alt="Global Vision" />
            </div>

            <h4>Humanitarian Initiatives</h4>
            <p>
              <ul>
                <li>
                  Global Relief Network: Coordinated humanitarian responses
                  across continents
                </li>
                <li>
                  Sustainable Development: Long-term community development
                  projects in underserved areas
                </li>
                <li>
                  Emergency Response Team: Rapid deployment of resources during
                  crises
                </li>
              </ul>
            </p>
          </div>
        </div>

        <h5>OUR PROGRAMME</h5>
      </section>

      <div
        className="about_background-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="about_overlay">
          <div className="about_card-grid">
            {cardData.map((card, index) => (
              <Card key={index} title={card.title} items={card.items} />
            ))}
          </div>
        </div>
      </div>

      <section className="impact-area">
        <h3>OUR IMPACT AREA</h3>
        <div className="impact-grid">
          <div className="impact-item">
            <div className="approach-item-imag">
              <img src={worldwide} alt="Global Vision" />
            </div>

            <h4>Global Reach</h4>
            <p>
              <ul>
                <li>Active presence in 15+ countries</li>
                <li>Virtual learning community of 10,000+ students</li>
                <li>
                  International partnerships with 50+ Islamic institutions
                </li>
                <li>
                  Annual knowledge conference drawing scholars from 30+ nations
                </li>
              </ul>
            </p>
          </div>
          <div className="impact-item">
            <div className="approach-item-imag">
              <img src={group} alt="Global Vision" />
            </div>

            <h4>Community Impact</h4>
            <p>
              <ul>
                <li>1000+ families served annually</li>
                <li>200+ youth mentorship programs completed</li>
                <li>50+ business startups supported</li>
                <li>5000+ hours of community service</li>
              </ul>
            </p>
          </div>
          <div className="impact-item">
            <div className="approach-item-imag">
              <img src={stop} alt="Global Vision" />
            </div>

            <h4>Humanitarian Achievement</h4>
            <p>
              <ul>
                <li>Emergency relief in 10+ crisis zones</li>
                <li>Sustainable development projects in 5 countries</li>
                <li>Educational sponsorship for 500+ students</li>
                <li>Medical assistance to 2000+ individuals annually</li>
              </ul>
            </p>
          </div>
        </div>
        <h5>JOIN OUR COMMUNITY</h5>
      </section>

      <section className="join-community">
        <div className="join-community-text">
          At AIM, We believe in the power of knowledge to transform lives and
          communities. Our doors are open to all who seek to learn, grow and
          serve humanity through Islam, Through Our Global Network We “re
          building bridges of understanding the religion of islam and
          cooperation across continents
        </div>
        <button className="join-button">GET INVOLVED</button>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
