import { Formik } from "formik";
import * as yup from "yup";
import {
  Button,
  FloatingLabel,
  Form,
  Nav,
  NavLink,
  Stack,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const schema = yup.object({
    fullName: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup
      .string()
      .required("Required")
      .matches(
        /^(?=.*[0-9])(?=.*[A-Z]).{8,20}$/,
        "Password must be 8-20 characters long, contain an uppercase character and a digit"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

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
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          navigate("/");
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack className="gap-3 mx-4">
              <FloatingLabel controlId="floatingFullName" label="Full Name">
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  value={values.fullName}
                  isInvalid={touched.fullName && !!errors.fullName}
                  name="fullName"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
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
                  value={values.confirmPassword}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                  name="confirmPassword"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                size="lg"
                type="submit"
                className="fs-3 mt-5 fw-bold text-dark"
                variant="outline-dark"
                style={{ border: "3px solid" }}
              >
                Create Account
              </Button>
              <div className="d-flex m-auto gap-2 text-dark">
                Already have an account?
                <Nav.Link
                  href="/login"
                  as={NavLink}
                  className="fw-bold text-decoration-underline"
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
