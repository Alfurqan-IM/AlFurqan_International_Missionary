import React from "react";
import "./section.css"; // Import the CSS module

const Intro = ({
  text,
  transliteration,
  translation,
  surah,
  verse,
  loading,
}) => {
  return (
    <div className={"intro_section"}>
      {loading ? (
        <div className={"intro_textContainer"}>loading verse...</div>
      ) : (
        <div className={"intro_textContainer"}>
          <div className={"intro_arabicText"}>{text}</div>
          <div className={"intro_englishText"}>{transliteration}</div>
          <div className={"intro_quoteText"}>
            {translation}
            <br /> [ {surah} : {verse} ]
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
