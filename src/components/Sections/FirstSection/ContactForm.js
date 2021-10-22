import React, { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Typography, Button } from "@material-ui/core";

const regex = {
  phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(\(|\)|\d{5})$/
};

export const contactFormValidationSchema = {
  phone: yup
    .string()
    .matches(regex.phone, {
      message: "Επιτρεπόμενοι χαρακτήρες τα ελληνικά, η τελεία και η παύλα"
    })
    .required("Η συμπλήρωση της οδού είναι υποχρεωτική"),
  email: yup
    .string()
    .matches(regex.email, {
      message: "Επιτρεπόμενοι χαρακτήρες τα ελληνικά, η τελεία και η παύλα"
    })
    .required("Η συμπλήρωση του αριθμού διεύθυνσης είναι υποχρεωτική"),
  password: yup
    .string()
    .matches(regex.password, {
      message: "Ο ταχυδρομικός κωδικός θα πρέπει να αποτελείται από 5 ψηφία"
    })
    .required("Η συμπλήρωση του ταχυδρομικού κώδικα είναι υποχρεωτική")
};

const ContactForm = ({ formData }) => {
  const initialFormValues = {
    phone: "",
    email: "",
    password: ""
  };
  return (
    <div>
      <Typography variant="h5" className="fw-bold">
        {formData.formText}
      </Typography>
      <Typography variant="subtitle1" gutterBottom className="mt-15">
        We work with ecosystem leaders, corporations and startups worldwide. How
        can we help you?
      </Typography>
      <Formik
        initialValues={initialFormValues}
        validationSchema={contactFormValidationSchema}
        onSubmit={(values, validateForm, { setSubmitting }) => {
          setTimeout(() => {
            validateForm();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit} className="contactForm mt-15">
            <div>
              <input
                type="phone"
                name="phone"
                onChange={handleChange}
                //   onBlur={handleBlur}
                //   value={values.phone}
                placeholder="Your Phone"
              />
              {errors.phone && touched.phone && errors.phone}
            </div>
            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                //   onBlur={handleBlur}
                //   value={values.email}
                placeholder="Your Email"
              />
              {errors.email && touched.email && errors.email}
            </div>
            <div>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                //   onBlur={handleBlur}
                //   value={values.password}
                placeholder="Password"
              />
              {errors.password && touched.password && errors.password}
            </div>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              className=""
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
