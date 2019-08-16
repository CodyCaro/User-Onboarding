import React, { useState } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserOnboardingForm({ errors, touched, values, status }) {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <Form>
        <Field
          component="input"
          type="text"
          name="name"
          placeholder="Enter Name"
        />
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field
          component="input"
          type="email"
          name="email"
          placeholder="Enter Email"
        />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field
          component="input"
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <label>Terms Of Service</label>
        <Field
          type="checkbox"
          name="termsOfService"
          checked={values.termsOfService}
        />
        {touched.termsOfService && errors.termsOfService && (
          <p>{errors.termsOfService}</p>
        )}
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

const formikHOC = withFormik({
  mapPropsToValues({ name, email, password, termsOfService }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      termsOfService: termsOfService || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Please enter your name.")
      .matches(
        /^[A-Za-z ]+$/,
        "Must not contain numbers or special characters!"
      ),
    email: Yup.string()
      .required("Please enter an email")
      .email(),
    password: Yup.string()
      .required("Must enter a password")
      .min(5, "Must be 5 characters long!"),
    termsOfService: Yup.boolean().oneOf(
      [true],
      "Must Accept Terms and Conditions"
    )
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log("handleSubmit: then: res: ", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.error("handleSubmit: catch: err: ", err));
  }
});

const OnboardingForm = formikHOC(UserOnboardingForm);

export default OnboardingForm;
