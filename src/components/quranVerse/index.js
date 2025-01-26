import React from "react";

const QuranVerse = ({
  text,
  translitration,
  translation,
  verse,
  surah,
  loading,
}) => {
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
      marginTop: "10px",
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
      {loading ? (
        <div style={styles.verseBox}>loading quran verse...</div>
      ) : (
        <div style={styles.verseBox}>
          <div style={styles.arabicText}>{text}</div>
          <div style={styles.translation}>{translitration}</div>
          <div style={styles.translation}>{translation}</div>
          <div style={styles.reference}>
            [{surah}: {verse}]
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranVerse;
