import React, { useEffect } from "react";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import "./programs.css";
import { useGetPrograms } from "./Api";
import centralMosque from "../../assets/centralMosque.png";
import Footer from "../../components/footer";
import EventCard from "../../components/eventCard";

const AllPrograms = () => {
  const { data: programsData, isLoading: isLoadingPrograms } = useGetPrograms();
  const events = programsData?.data?.programmes;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={"program_page_container"}>
      <Header />
      <PublicNav />
      <div className="about_us_banner-container">
        <img
          src={centralMosque}
          alt={"central mosques Pictures"}
          className="banner-image"
        />

        <div className="about_us_banner-overlay">
          <div className="about_us_banner-title">Our Programs</div>
        </div>
      </div>
      <div className={"grid"}>
        {events?.map((event, index) => (
          <EventCard key={index} event={event} loading={isLoadingPrograms} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AllPrograms;
