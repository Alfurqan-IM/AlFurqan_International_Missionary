import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./registerForm.css";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import { errorAlert, successAlert } from "../../utils";
import { useIsMutating } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "./Api";

const initialValues = {
  password: "",
//  confirmPassword: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Passwords must match")
  //   .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const isLoading = useIsMutating();
  const navigate = useNavigate();
  const { mutate, reset } = useResetPassword({
    onSuccess: () => {
      successAlert("Password has been reset successfully, you login now");
      navigate("/login");
    },
    onError: (error) => {
      errorAlert(error || "Failed to reset password");
    },
  });
  const handleSubmit = (values) => {
    const formdata = {
      password: values.password,
      token: new URLSearchParams(window.location.search).get("token"),
      email: new URLSearchParams(window.location.search).get("email"),
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
          Recover your Account <span className="highlight">&nbsp;!</span>
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <div className="form-group full-width">
              <label>Password *</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {/* <div className="form-group full-width">
              <label>Confirm Password *</label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div> */}

            <button type="submit" className="submit-btn">
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
