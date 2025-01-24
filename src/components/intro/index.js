import React from "react";
import "./section.css"; // Import the CSS module

const Intro = () => {
  return (
    <div className={"intro_section"}>
      <div className={"intro_textContainer"}>
        <div className={"intro_arabicText"}>
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </div>
        <div className={"intro_englishText"}>
          In the Name of Allah, The Most Gracious, The Most Merciful
        </div>
        <div className={"intro_quoteText"}>
          "Those who spend their wealth [in charity] by night and by day,
          secretly and publicly—they will have their reward with their Lord. And
          there will be no fear concerning them, nor will they grieve."
          <br />– Surah Al-Baqarah, 2:274
        </div>
      </div>
    </div>
  );
};

export default Intro;
