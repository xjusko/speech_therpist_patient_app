import { Formik } from "formik";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Modal,
  Nav,
  Row,
  Stack,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { Paths } from "../App";
import {
  ConfirmPasswordLabel,
  EmailLabel,
  NameLabel,
  PasswordLabel,
} from "../components/AccountComponents";
import ConfrimModal from "../components/ConfrimModal";
import Notification from "../components/Notification";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { animateClick } from "../utils/AnimationSettings";
import { fetchMyProfile, patchMyProfile, unlink } from "../utils/ApiRequests";
import { AccountInfo } from "../utils/CommonTypes";

function UserSettings() {
  const { user, setUser } = useAuth();
  const { profileData, setProfileData } = useProfile();
  const [notification, setNotification] = useState({
    notify: false,
    success: true,
    text: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
  });

  if (!profileData) {
    return <div></div>;
  }
  return (
    <div className="mx-4 my-2">
      <Row className="d-flex me-4 my-3 align-items-center">
        <Col className="fs-1 fw-bold">Account</Col>
      </Row>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: profileData.email,
          name: profileData.name,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await patchMyProfile(user, values).then((profile) => {
              setProfileData(profile);
              setNotification({
                notify: true,
                success: true,
                text: "Changes saved.",
              });
            });
          } catch (error: any) {
            setNotification({
              notify: true,
              success: false,
              text: error.message,
            });
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack className="gap-3 mx-2 my-5">
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
              <Button
                variant="outline-dark"
                type="submit"
                style={{ width: "100px", border: "3px solid" }}
                className="ms-auto mt-3"
              >
                <div>Save</div>
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
        <Col className="justify-content-center text-muted fw-bold fs-4">
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={async (e) => {
              const files = e.target.files;
              if (!files) {
                return;
              }
              await patchMyProfile(user, { image: files[0] }).then((res) =>
                setProfileData(res)
              );
            }}
          ></input>
          <motion.div
            {...animateClick}
            style={{ cursor: "pointer" }}
            onClick={() => inputRef.current?.click()}
          >
            Change Profile Picture
          </motion.div>
        </Col>
      </Row>
      <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
        <Col className="justify-content-center text-muted fw-bold fs-4">
          <ChangePasswordModal user={user} setProfileData={setProfileData} />
        </Col>
      </Row>
      {profileData.assignment_active && (
        <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
          <Col className="text-muted fw-bold fs-4">
            <ConfrimModal
              component={
                <motion.div {...animateClick} style={{ cursor: "pointer" }}>
                  Disconnect from my therapist
                </motion.div>
              }
              confirmAction={async () => {
                await unlink(user);
                fetchMyProfile(user)
                  .then((profile) => {
                    setProfileData(profile);
                    setNotification({
                      notify: true,
                      success: true,
                      text: "Disconnected from your therapist.",
                    });
                  })
                  .catch((error) => {
                    setNotification({
                      notify: true,
                      success: false,
                      text: "Did not manage to disconnect from your therapist. Check your internet connection.",
                    });
                  });
              }}
              title="Do you wish to disconnect from your therapist?"
              body="All your assigned exercises and meetings will be deleted."
            />
          </Col>
        </Row>
      )}
      {/* Log Out button */}
      <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
        <Col className="text-muted fw-bold fs-4">
          <motion.div {...animateClick}>
            <Nav.Link
              to={Paths.Login}
              onClick={() => {
                setProfileData({} as AccountInfo);
                setUser("");
              }}
              as={NavLink}
            >
              Log Out
            </Nav.Link>{" "}
          </motion.div>
        </Col>
      </Row>
      <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
        <Col className="justify-content-center text-danger fw-bold fs-4">
          <ConfrimModal
            component={
              <motion.div style={{ cursor: "pointer" }} {...animateClick}>
                Delete Account
              </motion.div>
            }
            confirmAction={() => {}}
            title="Do you really want to delete your account?"
            body="This action is irreversible"
          />
        </Col>
      </Row>
    </div>
  );
}

export default UserSettings;

function ChangePasswordModal({
  user,
  setProfileData,
}: {
  user: string;
  setProfileData: React.Dispatch<React.SetStateAction<AccountInfo>>;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const validationSchema = yup.object({
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
    <>
      <motion.div
        style={{ cursor: "pointer" }}
        {...animateClick}
        onClick={handleShow}
      >
        Change Password
      </motion.div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new passowrd</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              password: "",
              confirm_password: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await patchMyProfile(user, values).then((profile) => {
                  setProfileData(profile);
                });
              } catch (error) {}
              handleClose();
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Stack gap={4}>
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
                  <Button type="submit" variant="dark">
                    Save
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>{" "}
        </Modal.Body>
      </Modal>
    </>
  );
}
