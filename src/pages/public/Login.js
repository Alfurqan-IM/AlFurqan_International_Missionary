import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./registerForm.css";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import { useUserlogin } from "./Api";
import { errorAlert, successAlert } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useIsMutating } from "@tanstack/react-query";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const loading = useIsMutating();
  const {
    mutate,

    reset: resetMutation,
    isLoading: isSubmitting,
  } = useUserlogin({
    onSuccess: () => {
      successAlert("Login successful!");
      navigate("/dashboard");
      // The form reset will be handled in the handleSubmit function
    },
    onError: (error) => {
      errorAlert(error || "Failed to send message");
      resetMutation(); // Reset mutation state to allow resubmission
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    mutate(values);
  };

  return (
    <div className={"homepage_container"}>
      <Header />
      <PublicNav />
      <div className="form-wrapper">
        <h2>
          Login to your Account <span className="highlight">&nbsp;!</span>
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

            <div className="form-group full-width">
              <label>Password *</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" className="submit-btn">
              {isSubmitting || loading ? "Logging in..." : "Login"}
            </button>

            <div className="login-link">
              Not yet Register? &nbsp; <a href="/register">Register</a>, Forgot
              passwoprd? &nbsp; <a href="/forgotpassword">Reset</a>
            </div>

            <button type="button" className="google-btn">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
              />
              Continue with Google
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
