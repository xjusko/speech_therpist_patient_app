import { Formik } from "formik";
import { useState } from "react";
import { Button, Form, Nav, Stack } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Paths } from "../../App";
import {
  ConfirmPasswordLabel,
  EmailLabel,
  NameLabel,
  PasswordLabel,
} from "../../components/AccountComponents";
import Notification from "../../components/Notification";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/ProfileContext";
import { fetchMyProfile, login, register } from "../../utils/ApiRequests";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setProfileData } = useProfile();
  const [notification, setNotification] = useState({
    notify: false,
    success: true,
    text: "",
  });
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
        // create account and try to login using the same data
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await register(values);
            await login({
              email: values.email,
              password: values.password,
            }).then(async (data) => {
              setUser(data.token);
              await fetchMyProfile(data.token).then((profile) =>
                setProfileData(profile)
              );
            });
          } catch (error: any) {
            setNotification({
              notify: true,
              success: false,
              text: error.response.data.email[0],
            });
            setSubmitting(false);
            return;
          }
          navigate(Paths.DefaultExercisesTab);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack className="gap-3 mx-4" style={{ maxWidth: "300px" }}>
              {/* Alert to be shown when registration failed */}
              <Notification
                {...notification}
                setNotification={setNotification}
              />
              {/* Form fields */}
              {/* Validated only after first submit if the field are filled incorrectly, then validated live */}
              <NameLabel
                handleChange={handleChange}
                value={values.name}
                touched={touched.name}
                error={errors.name}
              />
              <EmailLabel
                handleChange={handleChange}
                value={values.email}
                touched={touched.email}
                error={errors.email}
              />
              <PasswordLabel
                handleChange={handleChange}
                value={values.password}
                touched={touched.password}
                error={errors.password}
              />
              <ConfirmPasswordLabel
                handleChange={handleChange}
                value={values.confirm_password}
                touched={touched.confirm_password}
                error={errors.confirm_password}
              />
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
                  to={Paths.Login}
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
