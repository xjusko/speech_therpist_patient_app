import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function Notification({ text }: { text: string }) {
  const [show, setShow] = useState(true);
  const closeNotification = () => setShow(false);

  return (
    <>
      <ToastContainer containerPosition="fixed" position="middle-center">
        <Toast
          delay={5000}
          bg="success"
          show={show}
          onClose={closeNotification}
          autohide
        >
          <Toast.Header>
            <div className="me-auto">Notification</div>
          </Toast.Header>
          <Toast.Body>
            <strong className="fs-5">Successfully sent the notification</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Notification;
