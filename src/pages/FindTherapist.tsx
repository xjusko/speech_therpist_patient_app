import React, { useState } from "react";
import { Form, Nav, NavLink, Offcanvas, Stack } from "react-bootstrap";

function FindTherapist() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      className="d-flex flex-column vh-100 justify-content-center mx-4"
      onScroll={handleShow}
    >
      <Nav.Link href="/" as={NavLink}>
        <svg
          style={{ width: "3rem", height: "3rem", opacity: "75%" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
          />
          <path
            fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
          />
        </svg>
      </Nav.Link>
      <Stack className="d-flex align-items-center my-4">
        <div className="fs-1 text-center text-light fw-bold font-monospace mb-3">
          Enter Link Here
        </div>
        <Form.Control
          className="text-center fs-3 text-uppercase mb-auto"
          size="lg"
          type="input"
          placeholder="Therapist Link"
          name="link"
        />
        <svg
          style={{ height: "4rem", width: "4rem" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          onClick={handleShow}
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="bottom"
          style={{ height: "70vh", background: "none", border: "none" }}
          className="text-light fs-2"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fs-1 font-monospace">
              Therapists
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      </Stack>
    </div>
  );
}

export default FindTherapist;
