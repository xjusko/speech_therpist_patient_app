import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

type LabelProps = {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  value: string;
  touched: boolean | undefined;
  error: string | undefined;
};

export const NameLabel = ({
  handleChange,
  value,
  touched,
  error,
}: LabelProps) => {
  return (
    <FloatingLabel controlId="floatingname" label="Full Name">
      <Form.Control
        className="w-100"
        size="lg"
        type="text"
        placeholder="Full Name"
        onChange={handleChange}
        value={value}
        isInvalid={touched && !!error}
        name="name"
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </FloatingLabel>
  );
};

export const EmailLabel = ({
  handleChange,
  value,
  touched,
  error,
}: LabelProps) => {
  return (
    <FloatingLabel controlId="floatingEmail" label="Email">
      <Form.Control
        size="lg"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={value}
        isInvalid={touched && !!error}
        name="email"
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </FloatingLabel>
  );
};

export const PasswordLabel = ({
  handleChange,
  value,
  touched,
  error,
}: LabelProps) => {
  return (
    <FloatingLabel controlId="floatingPassword" label="Password">
      <Form.Control
        size="lg"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={value}
        isInvalid={touched && !!error}
        name="password"
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </FloatingLabel>
  );
};

export const ConfirmPasswordLabel = ({
  handleChange,
  value,
  touched,
  error,
}: LabelProps) => {
  return (
    <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password">
      <Form.Control
        size="lg"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        value={value}
        isInvalid={touched && !!error}
        name="confirm_password"
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </FloatingLabel>
  );
};
