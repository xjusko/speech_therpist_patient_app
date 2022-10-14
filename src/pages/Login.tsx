import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Form,
  Stack,
  FloatingLabel,
  Button,
  Nav,
  Alert,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../utils/ApiRequests";

const schema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [show, setShow] = useState(false);
  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="fs-1 fw-bold my-5 font-monospace text-dark"
        style={{ textAlign: "center" }}
      >
        Speech Therapist
      </div>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await login(values);
          if (response.status === 200) {
            response.json().then((data) => setUser(data.token));
            navigate("/");
          } else {
            response.json().then((data) => setShow(true));
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack className="gap-3 mx-4" style={{ maxWidth: "300px" }}>
              {show && (
                <Alert variant="danger" className="text-center">
                  Invalid email or password
                </Alert>
              )}
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
                className="fs-3 mt-5 fw-bold text-dark"
                variant="outline-dark"
                style={{ border: "3px solid" }}
              >
                Log In
              </Button>
              <div className="d-flex m-auto gap-2 text-dark">
                Don't have an account?
                <Nav.Link
                  to="/register"
                  className="fw-bold text-decoration-underline"
                  as={NavLink}
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
