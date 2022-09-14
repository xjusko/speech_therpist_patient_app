import React, { useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  Nav,
  NavLink,
  Stack,
} from "react-bootstrap";

function Register() {
  const [loginInfo, setLoginInfo] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="fs-1 fw-bold my-5 font-monospace"
        style={{ textAlign: "center" }}
      >
        Speech Therapist
      </div>
      <Form>
        <Stack className="gap-3" style={{ width: "75vw", maxWidth: "500px" }}>
          <FloatingLabel controlId="floatingFullName" label="Full Name">
            <Form.Control size="lg" type="text" placeholder="Full Name" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmail" label="Email">
            <Form.Control size="lg" type="email" placeholder="Email" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control size="lg" type="password" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Confirm Password"
          >
            <Form.Control
              size="lg"
              type="password"
              placeholder="Confirm Password"
            />
          </FloatingLabel>
          <Button size="lg" type="submit" className="mt-5" variant="dark">
            Create Account
          </Button>
          <div className="d-flex m-auto gap-2">
            Already have an account?
            <Nav.Link href="/login" as={NavLink} className="fw-bold">
              Log In
            </Nav.Link>
          </div>
        </Stack>
      </Form>
    </div>
  );
}

export default Register;
