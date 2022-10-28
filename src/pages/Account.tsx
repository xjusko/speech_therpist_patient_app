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
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { patchMyProfile } from "../utils/ApiRequests";

function Account() {
  const { user, setUser } = useAuth();
  const { profileData, setProfileData } = useProfile();
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);
  const animationProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };

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
              setShow(false);
            });
          } catch (error) {
            setShow(true);
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack className="gap-3 mx-2 my-5">
              {/* Alert to be shown when registration failed */}
              {show && (
                <Alert variant="danger" className="text-center">
                  User with this email address already exists
                </Alert>
              )}
              {/* Form fields */}
              {/* Validated only after first submit if the field are filled incorrectly, then validated live */}

              <Stack direction="horizontal" className="gap-5">
                <AccountLabel>Full Name</AccountLabel>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                  name="name"
                  style={{ width: "70%" }}
                />
              </Stack>
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
              <Stack direction="horizontal" className="gap-5">
                <AccountLabel>Email</AccountLabel>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                  name="email"
                  style={{ width: "70%" }}
                />
              </Stack>
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <Button
                variant="outline-dark"
                type="submit"
                style={{ width: "100px", border: "3px solid" }}
                className="ms-auto mt-3 me-4"
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
            {...animationProps}
            style={{ cursor: "pointer" }}
            onClick={() => inputRef.current?.click()}
          >
            Change Profile Picture
          </motion.div>
        </Col>
      </Row>
      <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
        <Col className="justify-content-center text-muted fw-bold fs-4">
          <ChangePasswordModal
            user={user}
            animationProps={animationProps}
            setProfileData={setProfileData}
          />
        </Col>
      </Row>
      {/* Log Out button */}
      <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
        <Col className="">
          <motion.div {...animationProps}>
            <Nav.Link
              to="/login"
              onClick={() => setUser("")}
              as={NavLink}
              className="text-muted fw-bold fs-4"
            >
              Log Out
            </Nav.Link>{" "}
          </motion.div>
        </Col>
      </Row>
      <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
        <Col className="justify-content-center text-danger fw-bold fs-4">
          <motion.div style={{ cursor: "pointer" }} {...animationProps}>
            Delete Account
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}

export default Account;

function AccountLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-end" style={{ width: "15%" }}>
      {children}
    </div>
  );
}

function ChangePasswordModal({ user, setProfileData, animationProps }) {
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
        {...animationProps}
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
                  <div>
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
                  </div>
                  <div>
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
                  </div>
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
