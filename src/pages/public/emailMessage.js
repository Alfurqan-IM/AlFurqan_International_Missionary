import React from "react";
import "./registerForm.css";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";

const EmailMessage = () => {
  return (
    <div className={"homepage_container"}>
      <Header />
      <PublicNav />
      <div style={{ marginTop: "50px" }} className="form-wrapper">
        <h2>
          Please check your email for further instructions. Kindly note that
          email delivery may take a few moments. Thank you for your patience.
        </h2>
      </div>
    </div>
  );
};

export default EmailMessage;
