import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Nav,
  NavLink,
  Offcanvas,
  Row,
  Stack,
} from "react-bootstrap";
import FindTherapistCard from "../components/FindTherapistCard";
import storeItems from "../data/therapists.json";

function FindTherapist() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
      console.log(entry);
    });
  });
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".hidden");
    animatedElements.forEach((el) => observer.observe(el));
  });

  return (
    <div
      className="d-flex flex-column justify-content-center mx-4"
      onScroll={handleShow}
    >
      <Nav.Link href="/" as={NavLink}>
        <svg
          style={{ width: "3rem", height: "3rem", opacity: "50%" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
        </svg>
      </Nav.Link>

      <Stack className="d-flex align-items-center my-4">
        <div className="fs-1 text-center text-dark fw-bold font-monospace mb-3">
          Enter Link Here
        </div>

        <Form.Control
          className="text-center fs-3 text-uppercase"
          size="lg"
          type="input"
          placeholder="Therapist Link"
          name="link"
        />
        <div className="text-muted mb-4" style={{ fontSize: "0.8rem" }}>
          Enter the link you recieved from your therapist
        </div>
        <div style={{}}></div>

        <Row xs={1} className="g-3">
          {storeItems.map((item) => (
            <Col className="hidden" key={item.id}>
              <Nav.Link href={`/therapist/${item.id}`}>
                <FindTherapistCard {...item} />
              </Nav.Link>
            </Col>
          ))}
        </Row>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="bottom"
          style={{ height: "70vh", background: "none", border: "none" }}
          className="text-dark fs-2"
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
