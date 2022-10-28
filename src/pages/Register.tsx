import { Formik } from "formik";
import * as yup from "yup";
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Nav,
  Stack,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { login, register } from "../utils/ApiRequests";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [show, setShow] = useState(false);
  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup
      .string()
      .required("Required")
      .matches(
        /^(?=.*[0-9])(?=.*[A-Z]).{8,20}$/,
        "Password must be 8-20 characters long, contain an uppercase character and a digit"
      ),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="fs-1 fw-bold my-5 font-uppercase text-dark"
        style={{ textAlign: "center" }}
      >
        Speech Therapist
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // first register the user
          const registerResponse = await register(values);
          if (registerResponse.status === 201) {
            // if successfull, login and route to main page
            const loginResponse = await login({
              email: values.email,
              password: values.password,
            });
            // save authentication token to local storage
            loginResponse.json().then((data) => setUser(data.token));
            navigate("/taskmenu");
          } else {
            // otherwise show error
            registerResponse.json().then((data) => setShow(true));
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
                  User with this email address already exists
                </Alert>
              )}
              {/* Form fields */}
              {/* Validated only after first submit if the field are filled incorrectly, then validated live */}
              <FloatingLabel controlId="floatingname" label="Full Name">
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel controlId="floatingEmail" label="Email">
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                  name="email"
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
                  onChange={handleChange}
                  value={values.password}
                  isInvalid={touched.password && !!errors.password}
                  name="password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingConfirmPassword"
                label="Confirm Password"
              >
                <Form.Control
                  size="lg"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={values.confirm_password}
                  isInvalid={
                    touched.confirm_password && !!errors.confirm_password
                  }
                  name="confirm_password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirm_password}
                </Form.Control.Feedback>
              </FloatingLabel>
              {/* Create account button */}
              <Button
                size="lg"
                type="submit"
                className="fs-3 mt-4 fw-bold"
                variant="outline-dark"
                style={{ border: "3px solid" }}
              >
                Create Account
              </Button>
              {/* Routing to Log In page */}
              <div className="d-flex m-auto gap-2 text-dark mb-4">
                Already have an account?
                <Nav.Link
                  to="/login"
                  className="fw-bold text-decoration-underline"
                  as={NavLink}
                >
                  Log In
                </Nav.Link>
              </div>
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
