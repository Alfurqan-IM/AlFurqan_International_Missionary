import React, { useContext, useState } from "react";
import { Layout, Menu, Drawer } from "antd";
import {
  MenuOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import styles from "./index.module.css"; // Import the CSS module
import { AuthContext } from "../../contexts";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const PublicNav = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };
  const navigate = useNavigate();

  const donateClick = () => {
    navigate("/donate");
  };

  const menuItems = [
    { key: "home", label: <a href="/">Home</a> },
    {
      key: "about",
      label: "About Us",
      children: [
        { key: "about1", label: <a href="/about-us">About Us</a> },
        // { key: "Our Team", label: <a href="/team">Our Team</a> },
      ],
    },
    { key: "campaign", label: <a href="/campaigns">Campaigns</a> },
    {
      key: "events",
      label: "Activities",
      children: [
        { key: "event1", label: <a href="/programs">Programs</a> },
        { key: "event2", label: <a href="/event">Events</a> },
      ],
    },
    // !isAuthenticated && {
    //   key: "members",
    //   label: "Members",
    //   children: [
    //     { key: "member1", label: <a href="/login">Membership</a> },
    //     { key: "member2", label: <a href="/register">Join Us</a> },
    //   ],
    // },
    isAuthenticated && {
      key: "profile",
      label: <a href="/userprofile">Profile</a>,
    },
    { key: "prayer", label: <a href="/prayer-time">Prayer Time</a> },
    // { key: "zakat", label: "Zakat Calculator" },
    isAuthenticated
      ? {
          key: "login",
          label: (
            <button className={styles.logoutButton} onClick={logout}>
              Logout
            </button>
          ),
        }
      : { key: "login", label: <a href="/login">Login</a> },
  ];

  const menuItemsMobile = [
    { key: "home", label: <a href="/">Home</a> },
    { key: "about", label: <a href="/about-us">About Us</a> },
    { key: "Our Team", label: <a href="/team">Our Team</a> },

    { key: "campaign", label: <a href="/campaigns">Campaigns</a> },
    { key: "programs", label: <a href="/programs">Programs</a> },
    { key: "events", label: <a href="/event">Events</a> },

    // !isAuthenticated && {
    //   key: "members",
    //   label: "Members",
    //   children: [
    //     { key: "member1", label: <a href="/login">Membership</a> },
    //     { key: "member2", label: <a href="/register">Join Us</a> },
    //   ],
    // },
    isAuthenticated && {
      key: "profile",
      label: <a href="/userprofile">Profile</a>,
    },
    { key: "prayer", label: <a href="/prayer-time">Prayer Time</a> },
    // { key: "zakat", label: "Zakat Calculator" },
    isAuthenticated
      ? {
          key: "login",
          label: (
            <button className={styles.logoutButton} onClick={logout}>
              Logout
            </button>
          ),
        }
      : { key: "login", label: <a href="/login">Login</a> },
  ];

  return (
    <div className={styles.naviagtion_container}>
      <Header className={styles.header}>
        <div className={`${styles.desktopMenu}`}>
          <Menu mode="horizontal" items={menuItems} />
        </div>

        <div className={styles.actions}>
          <a
            className={styles.donateLink}
            href="https://donorbox.org/zakat-sadaqah-campaign"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.donateButton} type="button">
              Donate Zakat/Sadaqah
            </button>
          </a>
          <a
            href="https://wa.link/juv16r"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <WhatsAppOutlined className={styles.icon} />
          </a>
          <a
            href="https://www.instagram.com/alfurqan_intm?igsh=MTluMnhhd3piZ2dvdw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramOutlined className={styles.icon} />
          </a>

          <a
            href="https://x.com/alfurqan_im"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
          >
            <TwitterOutlined className={styles.icon} />
          </a>

          <a
            href="https://youtube.com/@alfurqanint_m?si=DamsLCVIIPR8wtA7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <YoutubeOutlined className={styles.icon} />
          </a>

          <a
            href="https://www.tiktok.com/@alfurqaninternational_m?_r=1&_t=ZS-93Crel84l9e"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <TikTokOutlined className={styles.icon} />
          </a>

          <MenuOutlined
            className={styles.menuIcon}
            onClick={showDrawer}
            aria-label="Open menu"
          />
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerVisible}
        className={styles.drawer}
      >
        <Menu mode="vertical" items={menuItemsMobile} />
      </Drawer>
    </div>
  );
};

export default PublicNav;
