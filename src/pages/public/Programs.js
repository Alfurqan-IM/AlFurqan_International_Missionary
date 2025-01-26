import React, { useEffect } from "react";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import "./programs.css";
import ProgramsBanner from "../../components/programs banner";
import { useGetPrograms, useGetSurah } from "./Api";
import QuranVerse from "../../components/quranVerse";
import ProgramCard from "../../components/programs info";
import OutcomeCard from "../../components/outcome";
import Footer from "../../components/footer";
import { useParams } from "react-router-dom";

const Programs = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSurah();
  const surah = data?.data?.surah;
  const { data: programsData, isLoading: isLoadingPrograms } = useGetPrograms();
  const events = programsData?.data?.programmes;
  const program = events?.filter((x) => x.programme_id == id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={"program_page_container"}>
      <Header />
      <PublicNav />
      <ProgramsBanner
        imageSrc={
          program &&
          program[0]?.programmesimages &&
          program[0]?.programmesimages[0]?.image0
        }
        title={program && program[0]?.title}
        description={program && program[0]?.description}
        loading={isLoadingPrograms}
      />
      <QuranVerse
        loading={isLoading}
        surah={surah && surah[1]?.surah}
        translation={surah && surah[1]?.translation}
        transliteration={surah && surah[1]?.transliteration}
        text={surah && surah[1]?.text}
        verse={surah && surah[1]?.verse}
      />
      <OutcomeCard
        title={program && program[0]?.title}
        loading={isLoadingPrograms}
        outcome1={
          program &&
          program[0]?.programmeoutcomes &&
          program[0]?.programmeoutcomes[0].outcome1
        }
        outcome2={
          program &&
          program[0]?.programmeoutcomes &&
          program[0]?.programmeoutcomes[0].outcome2
        }
        outcome3={
          program &&
          program[0]?.programmeoutcomes &&
          program[0]?.programmeoutcomes[0].outcome3
        }
      />
      <ProgramCard
        imageSrc={
          program &&
          program[0]?.programmesimages &&
          program[0]?.programmesimages[0]?.image0
        }
        title={program && program[0]?.heading}
        description={program && program[0]?.about}
        startDate={program && program[0]?.start_date}
        endDate={program && program[0]?.end_date}
        date={program && program[0]?.year}
        time={program && program[0]?.time}
      />

      <Footer />
    </div>
  );
};

export default Programs;
