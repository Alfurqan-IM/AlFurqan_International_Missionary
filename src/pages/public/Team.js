import React, { useEffect } from "react";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import "./team.css";
import leader from "../../assets/backgroundAbout.jpg";
import leader2 from "../../assets/leader5.png";
import team from "../../assets/teamBanner.png";
import Footer from "../../components/footer";
import { useParams } from "react-router-dom";
import TeamCard from "../../components/teamCard";
import MatronPatronCard from "../../components/matronPatron";

const Team = () => {
  const members = {
    patrons: [
      { name: "Muhammed Ibrahim", role: "Patron", image: leader },
      {
        name: "Abubakar Ibrahim",
        role: "Chief Executive Officer of A&I",
        image: leader2,
        title: "Director General",
      },
      { name: "Mrs Modinat Afolade", role: "Matron", image: leader },
    ],
    leadership: [
      {
        name: "Hafisllah Hassan",
        role: "Chief Administrative Officer",
        image: leader,
        title: "Secretary General",
      },
      {
        name: "Salam Muhammed",
        role: "Program & Development Manager",
        image: leader2,
        title: "Spiritual and Religious Leader",
      },
      {
        name: "Shaikh Ahmed",
        role: "National Youth Refugee Leader",
        image: leader,
        title: "Secretary General",
      },
      {
        name: "Akeem Alebi",
        role: "Technology & Systems Leader",
        image: leader2,
        title: "Secretary General",
      },
      {
        name: "Ridwanullah Adnan",
        role: "Community Outreach Chief",
        image: leader,
        title: "Secretary General",
      },
      {
        name: "Hadiath Umar",
        role: "Global Operations Manager",
        image: leader2,
        title: "Secretary General",
      },
      {
        name: "Hamidallah Azeez",
        role: "Members Outreach Officer",
        image: leader,
        title: "Secretary General",
      },
      {
        name: "Habeeb Adam",
        role: "Head of Missionary Board",
        image: leader2,
        title: "Secretary General",
      },
      {
        name: "Muharra Ishaq",
        role: "Public Relations Officer (PRO)",
        image: leader,
        title: "Secretary General",
      },
    ],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={"program_page_container"}>
      <Header />
      <PublicNav />
      <div className="banner-container">
        <img src={team} alt={"team Pictures"} className="banner-image" />

        <div className="team_banner-overlay">
          <div className="team_banner-title">National Governing Board</div>
          <div className="team_banner-description">
            Meet Our Matron & Patron
          </div>
        </div>
      </div>
      <div className="matronPatron">
        {members.patrons.map((member, index) => (
          <MatronPatronCard
            image={member.image}
            name={member.name}
            title={member.title}
            role={member.role}
          />
        ))}
      </div>
      <div className="leadershipContainer">
        <div className="leadershipHeader">Executive leadership</div>
        <div className="teamMembers">
          {members.leadership.map((member, index) => (
            <TeamCard
              image={member.image}
              name={member.name}
              title={member.title}
              role={member.role}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
