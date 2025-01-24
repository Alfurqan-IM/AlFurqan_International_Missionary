import React from "react";

const QuranVerse = () => {
  const styles = {
    container: {
      backgroundColor: "rgba(232, 243, 238, 1)", // Light greenish background
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "4% 3%",
      width: "100%",
    },
    verseBox: {
      padding: "20px",
      borderRadius: "10px",
    },
    arabicText: {
      fontSize: "18px",
      lineheight: "27px",
      fontWeight: "400",
      fontFamily: "Quintessential",
      color: "#000",
      marginBottom: "10px",
    },
    reference: {
      fontSize: "18px",
      lineheight: "27px",
      fontWeight: "400",
      fontFamily: "Quintessential",
      marginBottom: "10px",
    },
    translation: {
      fontSize: "18px",
      lineheight: "27px",
      fontWeight: "400",
      fontFamily: "Quintessential",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.verseBox}>
        <div style={styles.arabicText}>
          {`يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ`}
        </div>
        <div style={styles.reference}>[Surah Muhammad: 7]</div>
        <div style={styles.translation}>
          O you who believe, if you will help the religion prescribed by Allah,
          He will help you, and will stabilize your footings.
        </div>
      </div>
    </div>
  );
};

export default QuranVerse;
