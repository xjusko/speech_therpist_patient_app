import { useEffect, useState } from "react";
import { Button, Col, Form, Nav, Offcanvas, Row, Stack } from "react-bootstrap";
import { BsLink45Deg } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import FindTherapistCard from "../components/FindTherapistCard";
import { useAuth } from "../contexts/AuthContext";
import storeItems from "../data/therapists.json";
import { fetchTherapistList } from "../utils/ApiRequests";
import { BackArrowIcon } from "../utils/CommonIcons";

function FindTherapist() {
  const { user } = useAuth();
  const [link, setLink] = useState("");
  const [therapistList, setTherapistList] = useState([]);

  // Get all therapists
  useEffect(() => {
    fetchTherapistList(user).then((data) => {
      setTherapistList(data);
    });
  }, []);
  console.log(therapistList);

  return (
    <div className="d-flex flex-column justify-content-center mx-4">
      {/* Go to previous page button */}
      <div className="d-flex">
        <Nav.Link to="/" as={NavLink}>
          <BackArrowIcon />
        </Nav.Link>
      </div>

      {/* Link with therapist field and submit button */}
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

        {/* Render basic therapist information labels */}
        <Row xs={1} className="g-3">
          {storeItems.map((item) => (
            <Col key={item.id}>
              <FindTherapistCard {...item} />
            </Col>
          ))}
        </Row>
      </Stack>
    </div>
  );
}

export default FindTherapist;
