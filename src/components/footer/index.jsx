import React, { useState } from "react";
import logo from "../../assets/aim logo.png";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { errorAlert, successAlert } from "../../utils";
import { useSendMessage } from "../../pages/public/Api";
import { useIsMutating } from "@tanstack/react-query";
import "./footer.css"; // Import the CSS file

const Footer = () => {
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
  const { mutate, isSuccess, isError, reset, error } = useSendMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  if (isSuccess) {
    reset();
    successAlert("Your message was sent successfully");
    setFormData({ name: "", email: "", message: "" });
  }

  if (isError) {
    reset();
    errorAlert(error);
    setFormData({ name: "", email: "", message: "" });
  }

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
            <FacebookOutlined className="footer-icon" />
            <TwitterOutlined className="footer-icon" />
            <InstagramOutlined className="footer-icon" />
            <YoutubeOutlined className="footer-icon" />
          </div>
          <div>
            <button className="footer-button">Donate Now</button>
          </div>
        </div>

        {/* Middle Column */}
        <div className="footer-middle-column">
          <a href="/" className="footer-menu-item">
            Home
          </a>
          <a href="#donations" className="footer-menu-item">
            Donations
          </a>
          <a href="#careline" className="footer-menu-item">
            Muslim Care Line
          </a>
          <a href="#contact" className="footer-menu-item">
            Get In Touch
          </a>
          <a href="#blogs" className="footer-menu-item">
            Blogs
          </a>
        </div>

        {/* Right Column */}
        <div className="footer-right-column">
          <div>
            <h4 style={{ marginBottom: "10px" }}>GET IN TOUCH</h4>
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
              placeholder="Message"
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
        © 2024 Al-Furqan Institute Missionary
      </div>
    </footer>
  );
};

export default Footer;
