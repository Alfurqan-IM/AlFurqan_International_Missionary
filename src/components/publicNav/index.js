import React, { useState } from "react";
import { Layout, Menu, Drawer } from "antd";
import {
  MenuOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import styles from "./index.module.css"; // Import the CSS module

const { Header } = Layout;

const PublicNav = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const menuItems = [
    { key: "home", label: <a href="/">Home</a> },
    {
      key: "about",
      label: "About Us",
      children: [
        { key: "about1", label: "Our Mission" },
        { key: "Our Team", label: <a href="/team">Our Team</a> },
      ],
    },
    { key: "campaign", label: "Project Campaign" },
    {
      key: "events",
      label: "Program/Events",
      children: [
        { key: "event1", label: "Upcoming Events" },
        { key: "event2", label: "Past Events" },
      ],
    },
    {
      key: "members",
      label: "Members",
      children: [
        { key: "member1", label: "Membership Plans" },
        { key: "member2", label: "Join Us" },
      ],
    },
    { key: "prayer", label: "Prayer Time" },
    { key: "zakat", label: "Zakat Calculator" },
    { key: "login-item", label: "Login" },
  ];

  return (
    <div className={styles.naviagtion_container}>
      <Header className={styles.header}>
        <div className={`${styles.desktopMenu}`}>
          <Menu mode="horizontal" items={menuItems} />
        </div>

        <div className={styles.actions}>
          <button className={styles.donateButton} type="primary">
            Donate
          </button>
          <FacebookOutlined className={styles.icon} />
          <TwitterOutlined className={styles.icon} />
          <InstagramOutlined className={styles.icon} />
          <YoutubeOutlined className={styles.icon} />
          <MenuOutlined className={styles.menuIcon} onClick={showDrawer} />
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerVisible}
        className={styles.drawer}
      >
        <Menu mode="vertical" items={menuItems} />
      </Drawer>
    </div>
  );
};

export default PublicNav;
