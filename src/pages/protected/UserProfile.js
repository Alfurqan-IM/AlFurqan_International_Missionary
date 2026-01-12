import React from "react";

import UserHeader from "../../components/private header";
import BasicProfile from "../../components/basic profile";
import RegisterProgramme from "../../components/Register Program";
import UpdatePassword from "../../components/update password";
import FeedbackForm from "../../components/Feedback";
import NewsletterCard from "../../components/Newsletter";
import DashboardLayout from "../../components/Dashboardlayout";
import styles from "./UserProfile.module.css";
import PublicNav from "../../components/publicNav";
import Header from "../../components/header";

const UserProfile = () => {
  return (
    <DashboardLayout>
      <Header />
      <PublicNav />
      <UserHeader />

      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.userContainer}>
          <BasicProfile />
        </div>
        <RegisterProgramme />
        {/* Password Section */}
        <UpdatePassword />
        <FeedbackForm />
        {/* Bottom Section */}
        <div className={styles.userContainer}>
          <NewsletterCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
