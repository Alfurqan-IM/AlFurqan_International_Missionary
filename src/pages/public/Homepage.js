import React from "react";
import Carousel from "../../components/carousel";
import PublicNav from "../../components/publicNav";
import Header from "../../components/header";
import "./homepage.css";
import Intro from "../../components/intro";
import AboutUsSection from "../../components/about us";
import EventCard from "../../components/eventCard";
import QuranVerse from "../../components/quranVerse";
import IslamicCommunitySection from "../../components/AimCommunity";
import Footer from "../../components/footer";
import { useGetBanner, useGetPrograms, useGetSurah } from "./Api";
import CustomCarousel from "../../components/carousel2";
import quran from "../../assets/backgroundAbout.jpg";
import Bquran from "../../assets/slide1.png";

// import CustomCarousel from "../../components/carousel2";

const Homepage = () => {
  const bannerData = useGetBanner();

  const banner = bannerData?.data?.banner;
  console.log(bannerData?.data?.banner);
  const { data, isLoading } = useGetSurah();
  const surah = data?.data?.surah;
  const { data: programsData, isLoading: isLoadingPrograms } = useGetPrograms();
  const events = programsData?.data?.programmes;

  const item = [
    {
      image: quran,
      title: "title 1",
    },
    {
      image: Bquran,
      title: "title 3",
    },
  ];

  return (
    <div className={"homepage_container"}>
      <Header />
      <PublicNav />
      <CustomCarousel items={banner} />
      <Intro
        loading={isLoading}
        surah={surah && surah[0]?.surah}
        translation={surah && surah[0]?.translation}
        transliteration={surah && surah[0]?.transliteration}
        text={surah && surah[0]?.text}
        verse={surah && surah[0]?.verse}
      />
      <AboutUsSection />
      <div className={"program_container"}>
        <div className={"heading"}>Our Programs/Events</div>
        <div className={"grid"}>
          {events?.map((event, index) => (
            <EventCard key={index} event={event} loading={isLoadingPrograms} />
          ))}
        </div>
      </div>
      <QuranVerse
        loading={isLoading}
        surah={surah && surah[1]?.surah}
        translation={surah && surah[1]?.translation}
        transliteration={surah && surah[1]?.transliteration}
        text={surah && surah[1]?.text}
        verse={surah && surah[1]?.verse}
      />
      <IslamicCommunitySection />
      <Footer />
    </div>
  );
};

export default Homepage;
