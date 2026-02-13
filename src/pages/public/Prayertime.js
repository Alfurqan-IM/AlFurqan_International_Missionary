import React, { useState, useEffect, useCallback } from "react";
import "./IslamicPage.css";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import Footer from "../../components/footer";
import centralMosque from "../../assets/centralMosque.png";
import aimLogo from "../../assets/aim logo.png";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const IslamicPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [islamicDate, setIslamicDate] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [islamicCalendar, setIslamicCalendar] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Unable to retrieve location: ${error.message}`));
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
        },
      );
    });
  };

  const fetchIslamicData = useCallback(
    async (latitude, longitude, month = currentMonth, year = currentYear) => {
      try {
        setLoading(true);

        const today = new Date();
        const gregorianDate = today.toISOString().split("T")[0];

        const prayerResponse = await fetch(
          `https://api.aladhan.com/v1/timings/${gregorianDate}?latitude=${latitude}&longitude=${longitude}&method=2`,
        );

        if (!prayerResponse.ok) {
          throw new Error("Failed to fetch prayer times");
        }

        const prayerData = await prayerResponse.json();

        const calendarResponse = await fetch(
          `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}?latitude=${latitude}&longitude=${longitude}`,
        );

        if (!calendarResponse.ok) {
          throw new Error("Failed to fetch Islamic calendar");
        }

        const calendarData = await calendarResponse.json();

        setPrayerTimes(prayerData.data);
        setIslamicDate(prayerData.data.date.hijri);
        setIslamicCalendar(calendarData.data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [currentMonth, currentYear],
  );

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;

    if (newMonth > 12) {
      newMonth = 1;
      newYear = currentYear + 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    if (userLocation) {
      fetchIslamicData(
        userLocation.latitude,
        userLocation.longitude,
        newMonth,
        newYear,
      );
    }
  };

  const handlePreviousMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;

    if (newMonth < 1) {
      newMonth = 12;
      newYear = currentYear - 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    if (userLocation) {
      fetchIslamicData(
        userLocation.latitude,
        userLocation.longitude,
        newMonth,
        newYear,
      );
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        await fetchIslamicData(location.latitude, location.longitude);
      } catch (err) {
        setError(err.message);
        setLoading(false);

        const defaultLocation = { latitude: 21.4225, longitude: 39.8262 };
        setUserLocation(defaultLocation);
        await fetchIslamicData(
          defaultLocation.latitude,
          defaultLocation.longitude,
        );
      }
    };

    initializeApp();
  }, [fetchIslamicData]);

  const formatTime = (time) => {
    return time || "--:--";
  };

  const getMonthName = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1] || "";
  };

  if (loading) {
    return (
      <div className="loading_design">
        <img
          src={aimLogo} // Replace with the path to your logo
          alt="Al-Furqan Institute Missionary"
        />
        <Loading3QuartersOutlined spin />
      </div>
    );
  }

  return (
    <div className="about_us_container">
      <Header />
      <PublicNav />
      <div className="about_us_banner-container">
        <img
          src={centralMosque}
          alt="central mosques Pictures"
          className="banner-image"
        />
        <div className="about_us_banner-overlay">
          <div className="about_us_banner-title">
            Islamic Prayer Times & Calendar
          </div>
          <p style={{ color: "white" }}>Based on your current location</p>
        </div>
      </div>
      <div className="islamic-page">
        {error && <div className="error-message">{error}</div>}

        {islamicDate && (
          <div className="today-info">
            <div className="gregorian-date">
              <strong>Today:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="islamic-date">
              <strong>Islamic Date:</strong> {islamicDate.day}{" "}
              {islamicDate.month.en} {islamicDate.year}
            </div>
          </div>
        )}

        {prayerTimes && (
          <div className="prayer-times-section">
            <h2>Today's Prayer Times</h2>
            <div className="prayer-times-grid">
              <div className="prayer-time">
                <span className="prayer-name">Fajr</span>
                <span className="prayer-time-value">
                  {formatTime(prayerTimes.timings.Fajr)}
                </span>
              </div>
              <div className="prayer-time">
                <span className="prayer-name">Sunrise</span>
                <span className="prayer-time-value">
                  {formatTime(prayerTimes.timings.Sunrise)}
                </span>
              </div>
              <div className="prayer-time">
                <span className="prayer-name">Dhuhr</span>
                <span className="prayer-time-value">
                  {formatTime(prayerTimes.timings.Dhuhr)}
                </span>
              </div>
              <div className="prayer-time">
                <span className="prayer-name">Asr</span>
                <span className="prayer-time-value">
                  {formatTime(prayerTimes.timings.Asr)}
                </span>
              </div>
              <div className="prayer-time">
                <span className="prayer-name">Maghrib</span>
                <span className="prayer-time-value">
                  {formatTime(prayerTimes.timings.Maghrib)}
                </span>
              </div>
              <div className="prayer-time">
                <span className="prayer-name">Isha</span>
                <span className="prayer-time-value">
                  {formatTime(prayerTimes.timings.Isha)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="calendar-section">
          <div className="calendar-header">
            <button onClick={handlePreviousMonth} className="nav-button">
              ← Previous
            </button>
            <div>
              {getMonthName(currentMonth)} {currentYear} - Islamic Calendar
            </div>
            <button onClick={handleNextMonth} className="nav-button">
              Next →
            </button>
          </div>

          <div className="calendar-grid">
            {islamicCalendar.map((day, index) => (
              <div key={index} className="calendar-day">
                <div className="gregorian-date">{day.gregorian.day}</div>
                <div className="islamic-date">
                  {day.hijri.day} {day.hijri.month.en}
                </div>
              </div>
            ))}
          </div>
        </div>

        {userLocation && (
          <div className="location-info">
            <small>
              Location: {userLocation.latitude.toFixed(4)},{" "}
              {userLocation.longitude.toFixed(4)}
            </small>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default IslamicPage;
