import React from "react";
import Carousel from "../../components/carousel";
import PublicNav from "../../components/publicNav";
import Header from "../../components/header";
import "./homepage.css";
import Intro from "../../components/intro";
import AboutUsSection from "../../components/about us";
import EventCard from "../../components/eventCard";
import quran from "../../assets/quran.png";
import QuranVerse from "../../components/quranVerse";
import IslamicCommunitySection from "../../components/AimCommunity";
import Footer from "../../components/footer";

const Homepage = () => {
  const events = [
    {
      name: "TA’AFIZ-QURAN",
      description:
        "Al-Furqan Institute Michigan offers Ta’hfiz Al-Quran program, full-time and part-time options for adult and youth, focused on higher Islamic education.",
      url: "#",
      image: quran, // Replace with actual image URL
    },
    {
      name: "ISLAMIC STUDIES",
      description:
        "Our Islamic Studies program emphasizes higher Islamic education for Adult and Youth, equipping students with Islamic teachings.",
      url: "#",
      image: quran, // Replace with actual image URL
    },
  ];

  return (
    <div className={"homepage_container"}>
      <Header />
      <PublicNav />
      <Carousel />
      <Intro />
      <AboutUsSection />
      <div className={"program_container"}>
        <div className={"heading"}>Our Programs/Events</div>
        <div className={"grid"}>
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
      <QuranVerse />
      <IslamicCommunitySection />
      <Footer />
    </div>
  );
};

export default Homepage;
