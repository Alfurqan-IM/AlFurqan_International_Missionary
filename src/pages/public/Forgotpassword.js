import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./registerForm.css";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import { useForgotPassword } from "./Api";
import { errorAlert, successAlert } from "../../utils";
import { useIsMutating } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPassword = () => {
  const isLoading = useIsMutating();
  const navigate = useNavigate();
  const { mutate, reset } = useForgotPassword({
    onSuccess: () => {
      successAlert("Password reset link sent to your email");
      navigate("/email-message");
    },
    onError: (error) => {
      errorAlert(error || "Failed to send message");
      reset();
    },
  });
  const handleSubmit = (values) => {
    mutate(values);
    reset();
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
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="login-link">
              <div>
                Not yet Register? &nbsp; <a href="/login">Register</a>
              </div>
              <div>
                Remember password ? &nbsp; <a href="/login">Login</a>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPassword;
