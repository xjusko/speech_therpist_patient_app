import { Formik } from "formik";
import * as yup from "yup";
import {
  Alert,
  Button,
  Col,
  FloatingLabel,
  Form,
  Nav,
  Row,
  Stack,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Account() {
  const [show, setShow] = useState(false);
  const { setUser } = useAuth();

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
  });
  return (
    <div className="mx-4 my-2">
      <Row className="d-flex me-4 my-3 align-items-center">
        <Col className="fs-1 fw-bold">Account</Col>
      </Row>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: "email@email.com",
          name: "Full Name",
        }}
        onSubmit={async (values, { setSubmitting }) => {
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
              <Stack direction="horizontal" className="gap-5 ">
                <AccountLabel>Profile Picture</AccountLabel>
                <Form.Control
                  type="file"
                  accept="image/*"
                  style={{ width: "70%" }}
                />
              </Stack>
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
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Stack>
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
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>{" "}
              </Stack>
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
          Change Password
        </Col>
      </Row>
      {/* Log Out button */}
      <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
        <Col className="">
          <Nav.Link
            to="/login"
            onClick={() => setUser("")}
            as={NavLink}
            className="text-muted fw-bold fs-4"
          >
            Log Out
          </Nav.Link>
        </Col>
      </Row>
      <Row className="mt-auto mb-3 text-dark fs-2 text-center shadow-sm">
        <Col className="justify-content-center text-danger fw-bold fs-4">
          Delete Account
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

function InfoLabel({
  Icon,
  labelNumber,
  labelText,
}: {
  Icon: any;
  labelNumber: number;
  labelText: string;
}) {
  return (
    <Col
      xs={10}
      sm={5}
      style={{ border: "2px solid black", borderRadius: "16px" }}
    >
      <div className="d-flex mx-2 my-2 align-items-center">
        <Icon style={{ height: "2rem", width: "2rem" }} />
        <div className="d-flex flex-column">
          <div className="ms-2 fs-4 fw-bold">{labelNumber}</div>
          <div className="ms-2">{labelText}</div>
        </div>
      </div>
    </Col>
  );
}
