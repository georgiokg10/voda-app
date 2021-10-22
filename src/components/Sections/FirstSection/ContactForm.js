import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Typography, Button } from "@material-ui/core";

const regex = {
  phone: /^[+]?(?:[0-9]{2})?[0-9]{10}$/i,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i
};

const contactFormValidationSchema = yup.object({
  phone: yup
    .string()
    .matches(regex.phone, {
      message: "Invalid phone number. Please, enter a valid phone number. "
    })
    .required("Phone number can not be empty."),
  email: yup
    .string()
    .matches(regex.email, {
      message: "Invalid email. Please, enter a valid email."
    })
    .required("Email can not be empty."),
  password: yup
    .string()
    .min(8, "Password must have more than 8 digits")
    .matches(regex.password, {
      message: "Password should include at least a number, a capital letter, a symbol and a low case letter"
    })
    .required("Password can not be empty."),
});

const initialFormValues = {
  phone: "",
  email: "",
  password: ""
};

const ContactForm = ({ formData }) => {
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
        onSubmit={(isValid, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            if (isValid) {
              alert('Form submitted!')
            } else return;
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
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="contactForm mt-15">
            <div>
              <input
                type="phone"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="Your Phone *"
              />
            </div>
            <div className="errorMsg">
              {touched.phone && errors.phone && (
                <> {errors.phone} </>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Your Email *"
              />
            </div>
            <div className="errorMsg">
              {touched.email && errors.email && (
                <> {errors.email} </>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password *"
              />
            </div>
            <div className="errorMsg">
              {touched.password && errors.password && (
                <> {errors.password} </>
              )}
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
