import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Form,
  Stack,
  FloatingLabel,
  Button,
  Nav,
  NavLink,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});

function Login() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="fs-1 fw-bold my-5 font-monospace text-light"
        style={{ textAlign: "center" }}
      >
        Speech Therapist
      </div>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          navigate("/");
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack className="gap-3 mx-4">
              <FloatingLabel controlId="floatingEmail" label="Email">
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  size="lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                size="lg"
                type="submit"
                className="fs-3 mt-5 fw-bold text-light"
                variant="outline-dark"
                style={{ border: "3px solid" }}
              >
                Log In
              </Button>
              <div className="d-flex m-auto gap-2 text-light">
                Don't have an account?
                <Nav.Link
                  href="/register"
                  as={NavLink}
                  className="fw-bold text-decoration-underline"
                >
                  Sign In
                </Nav.Link>
              </div>
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
