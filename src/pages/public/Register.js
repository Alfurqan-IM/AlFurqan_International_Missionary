import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./registerForm.css";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";

const initialValues = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  state: "",
  country: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
  phone: Yup.string().required("Phone Number is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State/Province is required"),
  country: Yup.string().required("Country is required"),
});

const RegisterForm = () => {
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
          Account Registration<span className="highlight">!</span>
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <div className="form-group">
              <label>First Name *</label>
              <Field name="firstName" type="text" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <Field name="lastName" type="text" />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            <div className="form-group full-width">
              <label>Gender *</label>
              <Field name="gender" as="select">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="error" />
            </div>

            <div className="form-group full-width">
              <label>Email Address *</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group full-width">
              <label>Password *</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-group full-width">
              <label>Phone Number *</label>
              <Field name="phone" type="text" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>City *</label>
              <Field name="city" type="text" />
              <ErrorMessage name="city" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>State/Province *</label>
              <Field name="state" type="text" />
              <ErrorMessage name="state" component="div" className="error" />
            </div>

            <div className="form-group full-width">
              <label>Country *</label>
              <Field name="country" type="text" />
              <ErrorMessage name="country" component="div" className="error" />
            </div>

            <div className="login-link">
              <p className="consent-text">Data Privacy & Consent</p>
            </div>

            <button type="submit" className="submit-btn">
              Sign Up
            </button>

            <div className="login-link">
              Already a user? &nbsp; <a href="/login">Login</a>
            </div>

            <button type="button" className="google-btn">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
              />
              Sign up with Google
            </button>

            <small className="privacy-info">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="/">Privacy Policy</a> and{" "}
              <a href="/">Terms of Service</a> apply.
            </small>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
