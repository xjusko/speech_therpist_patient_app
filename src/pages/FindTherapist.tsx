import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { BsLink45Deg } from "react-icons/bs";
import FindTherapistCard from "../components/FindTherapistCard";
import { useAuth } from "../contexts/AuthContext";
import { fetchTherapistList, linkRequest } from "../utils/ApiRequests";
import { TherapistProfileInfo } from "../utils/CommonTypes";

function FindTherapist() {
  const { user } = useAuth();
  const [link, setLink] = useState("");
  const [therapistList, setTherapistList] = useState<TherapistProfileInfo[]>(
    []
  );
  // Get all therapists
  useEffect(() => {
    fetchTherapistList(user).then((data) => {
      setTherapistList(data);
    });
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center mx-4">
      {/* Link with therapist field and submit button */}
      <Stack className="d-flex align-items-center my-4">
        <div className="fs-1 text-center text-dark fw-bold font-uppercase mb-3">
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
          <Button
            variant="outline-dark"
            onClick={() => linkRequest(user, { therapist_code: link })}
          >
            <BsLink45Deg style={{ width: "3rem", height: "3rem" }} />
          </Button>
        </Form>
        <div className="text-muted" style={{ fontSize: "0.8rem" }}>
          Enter the link you recieved from your therapist
        </div>

        {/* Render basic therapist information labels */}
        <Row xs={1} className="g-3">
          {therapistList.map((item) => (
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
