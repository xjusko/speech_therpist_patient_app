import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

// Notification used to inform the user after his actions.
function Notification({
  text,
  notify,
  setNotification,
  success,
}: {
  text: string;
  notify: boolean;
  setNotification: React.Dispatch<
    React.SetStateAction<{
      notify: boolean;
      success: boolean;
      text: string;
    }>
  >;
  success: boolean;
}) {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        style={{ marginBottom: "100px", opacity: "0.8" }}
      >
        <Toast
          delay={3000}
          bg={success ? "success" : "danger"}
          show={notify}
          onClose={() =>
            setNotification((prev) => ({ ...prev, notify: false }))
          }
          autohide
        >
          <Toast.Body className="text-center text-uppercase">
            <strong className="fs-5">{text}</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Notification;
