import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./registerForm.css";
import Header from "../../components/header";
import PublicNav from "../../components/publicNav";
import { useRegisterUser } from "./Api";
import { successAlert, errorAlert } from "../../utils";
import { useNavigate } from "react-router-dom";

const initialValues = {
  first_name: "",
  last_name: "",
  gender: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  city: "",
  state: "",
  country: "",
  address: "",
};

const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string().required("Phone Number is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State/Province is required"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
});

const RegisterForm = () => {
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [formResetKey, setFormResetKey] = useState(0);
  const navigate = useNavigate();

  const {
    mutate,
    isSuccess,
    isError,
    error,
    reset: resetMutation,
    isLoading: isSubmitting,
  } = useRegisterUser({
    onSuccess: (data, variables, context) => {
      successAlert("Registration successful!");
      navigate("/email-message");
    },
    onError: (error) => {
      errorAlert(error || "Failed to send message");
      resetMutation();
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd"
        );
        const data = await response.json();
        const sortedCountries = data
          .map((country) => ({
            name: country.name.common,
            code: country.cca2,
            callingCode: country.idd?.root
              ? `${country.idd.root}${
                  country.idd.suffixes ? country.idd.suffixes[0] : ""
                }`
              : "+1",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(sortedCountries);
        setIsLoadingCountries(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (countryName, setFieldValue) => {
    const selectedCountry = countries.find(
      (country) => country.name === countryName
    );
    if (selectedCountry) {
      setCountryCode(selectedCountry.callingCode);
      setFieldValue("phone", selectedCountry.callingCode);
    }
  };

  const handlePhoneChange = (e, setFieldValue) => {
    const value = e.target.value;
    if (countryCode && !value.startsWith(countryCode)) {
      setFieldValue("phone", countryCode + value.replace(/^\+?\d*/, ""));
    } else {
      setFieldValue("phone", value);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    const { confirmPassword, ...submitData } = values;
    const formData = new FormData();
    Object.keys(submitData).forEach((key) => {
      if (submitData[key] !== null && submitData[key] !== undefined) {
        formData.append(key, submitData[key]);
      }
    });

    mutate(formData, {
      onSuccess: () => {
        resetForm();
        setCountryCode("");
        setFormResetKey((prev) => prev + 1);
      },
      error: () => {
        resetMutation();
      },
    });
  };

  return (
    <div className={"homepage_container"}>
      <Header />
      <PublicNav />
      <div className="form-wrapper">
        <h2>
          Account Registration<span className="highlight">!</span>
        </h2>

        {isError && (
          <div className="error-message">
            {error?.response?.data?.message ||
              "Registration failed. Please try again."}
          </div>
        )}

        {isSuccess && (
          <div className="error-message">
            {error?.response?.data?.message ||
              "Registration failed. Please try again."}
          </div>
        )}

        <Formik
          key={formResetKey}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            setFieldValue,
            values,
            isSubmitting: formikSubmitting,
            resetForm,
          }) => (
            <Form className="form">
              <div className="form-group">
                <label>First Name *</label>
                <Field name="first_name" type="text" />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <Field name="last_name" type="text" />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group full-width">
                <label>Gender *</label>
                <Field name="gender" as="select">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group full-width">
                <label>Confirm Password *</label>
                <Field name="confirmPassword" type="password" />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group full-width">
                <label>Country *</label>
                <Field
                  name="country"
                  as="select"
                  onChange={(e) => {
                    setFieldValue("country", e.target.value);
                    handleCountryChange(e.target.value, setFieldValue);
                  }}
                >
                  <option value="">Select Country</option>
                  {isLoadingCountries ? (
                    <option value="" disabled>
                      Loading countries...
                    </option>
                  ) : (
                    countries.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))
                  )}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group full-width">
                <label>Phone Number *</label>
                <Field
                  name="phone"
                  type="text"
                  placeholder={countryCode || "Select country"}
                  onChange={(e) => handlePhoneChange(e, setFieldValue)}
                />
                <ErrorMessage name="phone" component="div" className="error" />
                {countryCode && (
                  <small className="phone-hint">
                    Country code: {countryCode}
                  </small>
                )}
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
                <label>Address *</label>
                <Field name="address" type="text" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting || formikSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>

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

              <div className="login-link">
                Already a user? &nbsp; <a href="/login">Login</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
