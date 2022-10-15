import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Nav,
  Stack,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../utils/ApiRequests";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [show, setShow] = useState(false);
  return (
    <div className="d-flex flex-column align-items-center">
      {/* Title */}
      <div
        className="fs-1 fw-bold my-5 font-monospace text-dark"
        style={{ textAlign: "center" }}
      >
        Speech Therapist
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await login(values);
          // save authentication token to local storage if login was succesful
          if (response.status === 200) {
            response.json().then((data) => setUser(data.token));
            navigate("/");
            // otherwise show error
          } else {
            response.json().then((data) => setShow(true));
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack className="gap-3 mx-4" style={{ maxWidth: "300px" }}>
              {/* Alert to be shown when registration failed */}
              {show && (
                <Alert variant="danger" className="text-center">
                  Invalid email or password
                </Alert>
              )}
              {/* Form fields */}
              {/* Validated only after first submit if the field are filled incorrectly, then validated live */}
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
              {/* Log In button */}
              <Button
                size="lg"
                type="submit"
                className="fs-3 mt-5 fw-bold text-dark"
                variant="outline-dark"
                style={{ border: "3px solid" }}
              >
                Log In
              </Button>
              {/* Routing to registration page */}
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
