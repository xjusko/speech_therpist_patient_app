import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { BsLink45Deg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { Paths } from "../../App";
import FindTherapistCard from "../../components/FindTherapistCard";
import Notification from "../../components/Notification";
import { useAuth } from "../../contexts/AuthContext";
import { fetchTherapistList, linkRequest } from "../../utils/ApiRequests";

function TherapistsTab() {
  const { user } = useAuth();
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    notify: false,
    success: true,
    text: "",
  });

  const { data: therapistList } = useSWR(user, fetchTherapistList, {
    onError() {
      navigate(Paths.UnexpectedError);
    },
  });

  if (!therapistList) {
    return <div></div>;
  }

  return (
    <div className="d-flex flex-column justify-content-center mx-4">
      <Notification {...notification} setNotification={setNotification} />
      {/* Link with therapist field and submit button */}
      <Stack className="d-flex align-items-center my-4">
        <div className="fs-1 text-center text-dark fw-bold font-uppercase mb-3 my-1">
          Enter Link Here
        </div>
        <Form
          className="d-flex text-center"
          onSubmit={(e) => {
            linkRequest(user, { therapist_code: link })
              .then(() =>
                setNotification({
                  notify: true,
                  success: true,
                  text: "Successfully sent the request.",
                })
              )
              .catch(() =>
                setNotification({
                  notify: true,
                  success: false,
                  text: "Invalid therapist code.",
                })
              );

            e.preventDefault();
          }}
        >
          <Form.Control
            className="text-center fs-3 text-uppercase"
            size="lg"
            type="input"
            placeholder="Therapist Link"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button variant="outline-dark" type="submit">
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

export default TherapistsTab;
