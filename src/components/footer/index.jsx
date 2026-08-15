import React, { useContext, useState } from "react";
import logo from "../../assets/aim logo.png";
import {
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { errorAlert, successAlert } from "../../utils/index";
import { useSendMessage } from "../../pages/public/Api";
import { useIsMutating } from "@tanstack/react-query";
import { DonationContext } from "../../contexts";
import "./footer.css"; // Import the CSS file

const Footer = () => {
  const { openDonation } = useContext(DonationContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isValidEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w{2,3}$/;
    return regex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isLoading = useIsMutating();

  const { mutate } = useSendMessage({
    onSuccess: () => {
      successAlert("Your message was sent successfully");
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      errorAlert(error.message || "Failed to send message");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <footer className="footer-container">
      {/* Top Section */}
      <div className="footer-top-section">
        {/* Left Column */}
        <div className="footer-left-column">
          <div className="footer-logo-container">
            <img src={logo} alt="Logo" className="footer-logo" />
          </div>
          <div className="footer-icons">
            <a
              href="https://wa.link/juv16r"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsAppOutlined className="footer-icon" />
            </a>
            <a
              href="https://www.instagram.com/alfurqan_intm?igsh=MTluMnhhd3piZ2dvdw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramOutlined className="footer-icon" />
            </a>

            <a
              href="https://x.com/alfurqan_im"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
            >
              <TwitterOutlined className="footer-icon" />
            </a>

            <a
              href="https://youtube.com/@alfurqanint_m?si=DamsLCVIIPR8wtA7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <YoutubeOutlined className="footer-icon" />
            </a>

            <a
              href="https://www.tiktok.com/@alfurqaninternational_m?_r=1&_t=ZS-93Crel84l9e"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <TikTokOutlined className="footer-icon" />
            </a>
          </div>
          <div>
            <button
              type="button"
              onClick={openDonation}
              className="dbox-donation-page-button"
              style={{
                display: "flex",
                padding: "4px 20px",
                backgroundColor: "rgba(5, 156, 90, 1)",
                color: "white",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 1)",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "41px",
                marginTop: "20px",
                cursor: "pointer",
                fontFamily: "Inknut Antiqua",
              }}
            >
              Donate Now
            </button>
          </div>
        </div>

        {/* Middle Column */}
        <div className="footer-middle-column" id="bottom">
          <a href="/" className="footer-menu-item">
            Home
          </a>
          <a href="/campaigns" className="footer-menu-item">
            Donations
          </a>
          {/* <a href="#careline" className="footer-menu-item">
            Muslim Care Line
          </a> */}
          <a href="#bottom" className="footer-menu-item">
            Get In Touch
          </a>
          {/* <a href="#blogs" className="footer-menu-item">
            Blogs
          </a> */}
        </div>

        {/* Right Column */}
        <div className="footer-right-column">
          <div>
            <h4 style={{ marginBottom: "10px" }}>
              WOULD YOU LIKE TO GET INVOLVED?
            </h4>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="footer-input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="footer-input"
            />
            <textarea
              placeholder="I would like to get involved as a Patron, Volunteer, Partner, Member, Country Representative, or by attending events…"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="footer-input footer-textarea"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={
              !formData.name ||
              !formData.email ||
              !isValidEmail(formData.email) ||
              !formData.message
            }
            className="footer-submit-button"
          >
            {isLoading ? "Sending message..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom-section">
        © 2026 Al-Furqan International
      </div>
    </footer>
  );
};

export default Footer;
