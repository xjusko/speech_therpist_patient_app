import React, { useEffect, useState } from "react";
import { Button, Col, Form, Nav, Offcanvas, Row, Stack } from "react-bootstrap";
import { BsLink45Deg } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import FindTherapistCard from "../components/FindTherapistCard";
import { useAuth } from "../contexts/AuthContext";
import storeItems from "../data/therapists.json";
import { fetchTherapistList } from "../utils/ApiRequests";
import { BackArrowIcon } from "../utils/CommonIcons";

function FindTherapist() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [link, setLink] = useState("");
  const [therapistList, setTherapistList] = useState([]);

  useEffect(() => {
    fetchTherapistList(user).then((data) => {
      setTherapistList(data);
    });
  }, []);
  console.log(therapistList);

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
            <BsLink45Deg style={{ width: "3rem", height: "3rem" }} />
          </Button>
        </Form>
        <div className="text-muted" style={{ fontSize: "0.8rem" }}>
          Enter the link you recieved from your therapist
        </div>

        <Row xs={1} className="g-3">
          {storeItems.map((item) => (
            <Col key={item.id}>
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
