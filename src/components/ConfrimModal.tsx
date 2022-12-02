import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

// Pop up confirm action window
function ConfrimModal({
  component,
  title,
  body,
  confirmAction,
}: {
  component: JSX.Element;
  title: string;
  body: string;
  confirmAction: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* Clickable component */}
      <div onClick={handleShow}>{component}</div>
      {/* Confimartion window */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              confirmAction();
              handleClose();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfrimModal;
