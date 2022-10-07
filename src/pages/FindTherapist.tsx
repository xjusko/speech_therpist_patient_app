import React, { useEffect, useState } from "react";
import { Button, Col, Form, Nav, Offcanvas, Row, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import FindTherapistCard from "../components/FindTherapistCard";
import storeItems from "../data/therapists.json";
import { BackArrowIcon } from "../utils/CommonIcons";

function FindTherapist() {
  const [show, setShow] = useState(false);
  const [link, setLink] = useState("");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".hidden");
    animatedElements.forEach((el) => observer.observe(el));
  });

  return (
    <div
      className="d-flex flex-column justify-content-center mx-4"
      onScroll={() => setShow(true)}
    >
      <div className="d-flex">
        <Nav.Link to="/" as={NavLink}>
          <BackArrowIcon />
        </Nav.Link>
      </div>

      <Stack className="d-flex align-items-center my-4">
        <div className="fs-1 text-center text-dark fw-bold font-monospace mb-3">
          Enter Link Here
        </div>
        <Form className="d-flex text-center">
          <Form.Control
            className="text-center fs-3 text-uppercase"
            size="lg"
            type="input"
            placeholder="Therapist Link"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button variant="dark">
            <svg
              style={{ width: "3rem", height: "3rem" }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
            </svg>
          </Button>
        </Form>
        <div className="text-muted" style={{ fontSize: "0.8rem" }}>
          Enter the link you recieved from your therapist
        </div>

        <Row xs={1} className="g-3">
          {storeItems.map((item) => (
            <Col className="hidden" key={item.id}>
              <FindTherapistCard {...item} />
            </Col>
          ))}
        </Row>
        <Offcanvas
          show={show}
          onHide={() => setShow(false)}
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
