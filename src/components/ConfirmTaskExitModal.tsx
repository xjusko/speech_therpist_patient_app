import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ConfirmTaskExitModal({ icon, to }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div onClick={handleShow}>{icon}</div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you wish to exit the task?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your answers will not be saved.</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            No
          </Button>
          <Button variant="dark" onClick={() => navigate(to)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmTaskExitModal;
