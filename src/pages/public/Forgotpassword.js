import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./registerForm.css";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPassword = () => {
  const handleSubmit = (values, { resetForm }) => {
    alert(JSON.stringify(values, null, 2));
    resetForm();
  };

  return (
    <div className={"homepage_container"}>
      <Header />
      <PublicNav />
      <div className="form-wrapper">
        <h2>
          Recover your Account <span className="highlight">&nbsp;!</span>
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <div className="form-group full-width">
              <label>Email Address *</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <button type="submit" className="submit-btn">
              submit
            </button>

            <div className="login-link">
              Not yet Register? &nbsp; <a href="/login">Register</a>, Remember
              password ? &nbsp; <a href="/login">Login</a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPassword;
