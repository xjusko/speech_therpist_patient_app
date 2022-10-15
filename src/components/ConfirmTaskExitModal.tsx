import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// handles quitting tasks without submitting the answers
function ConfirmTaskExitModal({ icon, to }: { icon: JSX.Element; to: string }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* Clickable component */}
      <div onClick={handleShow}>{icon}</div>
      {/* Confimartion window */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you wish to exit the task?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your answers will not be saved.</Modal.Body>
        {/* Stay on page if No is chosen, otherwise go to previous page */}
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
