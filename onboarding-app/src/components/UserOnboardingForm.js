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
        <Field
          component="input"
          type="email"
          name="email"
          placeholder="Enter Email"
        />
        <Field
          component="input"
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <label>Terms Of Service</label>
        <Field
          type="checkbox"
          name="termsOfService"
          checked={values.termsOfService}
        />
        <button>Submit</button>
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
    species: Yup.string().required("not a good input"),
    size: Yup.number().required(),
    notes: Yup.string()
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
