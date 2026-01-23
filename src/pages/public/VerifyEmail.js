import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./registerForm.css";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import { errorAlert, successAlert } from "../../utils";
import { useIsMutating } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useVerifyEmail } from "./Api";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const VerifyEmail = () => {
  const isLoading = useIsMutating();
  const navigate = useNavigate();
  const { mutate, reset } = useVerifyEmail({
    onSuccess: () => {
      successAlert("Email Verification successfully, you can login now");
      navigate("/login");
    },
    onError: (error) => {
      errorAlert(error || "Failed to reset password");
    },
  });
  const handleSubmit = (values) => {
    const formdata = {
      email: values.email,
      verificationString: new URLSearchParams(window.location.search).get(
        "token"
      ),
    };
    mutate(formdata);
    reset();
  };

  return (
    <div className={"homepage_container"}>
      <Header />
      <PublicNav />
      <div className="form-wrapper">
        <h2>
          Verify your Account <span className="highlight">&nbsp;!</span>
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <div className="form-group full-width">
              <label>Email *</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <button type="submit" className="submit-btn">
              {isLoading ? "Submitting..." : "Verify Email"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default VerifyEmail;
