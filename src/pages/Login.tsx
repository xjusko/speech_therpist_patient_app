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
import { Paths } from "../App";
import { EmailLabel, PasswordLabel } from "../components/AccountComponents";
import Notification from "../components/Notification";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { fetchMyProfile, login } from "../utils/ApiRequests";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setProfileData } = useProfile();
  const [notification, setNotification] = useState({
    notify: false,
    success: true,
    text: "",
  });
  return (
    <div className="d-flex flex-column align-items-center">
      {/* Title */}
      <div
        className="fs-1 fw-bold my-5 text-dark"
        style={{ textAlign: "center" }}
      >
        Speech Therapist
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login(values).then(async (data) => {
              setUser(data.token);
              await fetchMyProfile(data.token).then((profile) =>
                setProfileData(profile)
              );
            });
          } catch (error: any) {
            setNotification({
              notify: true,
              success: false,
              text: error.response.data.non_field_errors[0],
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
              {/* Log In button */}
              <Button
                size="lg"
                type="submit"
                className="fs-3 mt-5 fw-bold"
                variant="outline-dark"
                style={{ border: "3px solid" }}
              >
                Log In
              </Button>
              {/* Routing to registration page */}
              <div className="d-flex m-auto gap-2 text-dark">
                Don't have an account?
                <Nav.Link
                  to={Paths.Register}
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
