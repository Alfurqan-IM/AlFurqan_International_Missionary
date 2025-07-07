import React from "react";
import PublicNav from "../../components/publicNav";
import Header from "../../components/header";
import "./homepage.css";
import Footer from "../../components/footer";
import { useGetEvent } from "./Api";
import CustomCarousel2 from "../../components/carousel2/eventCarousel";

const Event = () => {
  const eventData = useGetEvent();

  const events = eventData?.data?.data?.events;

  return (
    <div className={"homepage_container"}>
      <Header />
      <PublicNav />
      <CustomCarousel2 items={events} />
      <Footer />
    </div>
  );
};

export default Event;
