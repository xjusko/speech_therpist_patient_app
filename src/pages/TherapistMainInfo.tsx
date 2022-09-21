import React from "react";
import {
  Button,
  Card,
  Nav,
  NavLink,
  Stack,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import storeItems from "../data/therapists.json";
import { BackArrowIcon, HomeIcon } from "../utils/CommonIcons";

function TherapistMainInfo() {
  const { id } = useParams();
  const therapist = storeItems.find((i) => i.id === Number(id));
  return (
    <div className="mx-4">
      <div className="d-flex mt-1">
        <Nav.Link href="/findtherapist" as={NavLink}>
          <BackArrowIcon />
        </Nav.Link>
        <Nav.Link href="/" as={NavLink} className="ms-auto">
          <HomeIcon />
        </Nav.Link>
      </div>
      <Card
        style={{ background: "none", border: "none" }}
        className="mt-1 text-dark"
      >
        <Card.Img
          src={therapist?.imageUrl}
          style={{ objectFit: "fill", height: "45vh" }}
        />
        <Card.Body>
          <Card.Title className="d-flex align-items-center">
            {therapist?.firstName} {therapist?.lastName}
            <span className="ms-auto" style={{ fontSize: "0.85rem" }}>
              {therapist?.email}
            </span>
          </Card.Title>
          <Card.Subtitle className="my-2 d-flex align-items-center">
            {therapist?.location}
            {", "}
            {therapist?.city}
            <span className="ms-auto" style={{ fontSize: "0.85rem" }}>
              {therapist?.phone}
            </span>
          </Card.Subtitle>
          <hr style={{ opacity: "1", height: "1px" }} />
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Stack
            direction="horizontal"
            className="d-flex gap-3"
            style={{ flexWrap: "nowrap", overflowX: "auto" }}
          >
            <EventButton />

            <EventButton />

            <EventButton />

            <EventButton />

            <EventButton />
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TherapistMainInfo;
const renderTooltip = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    Simple tooltip
  </Tooltip>
);
const EventButton = () => {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant="success" className="text-center gap-2 my-3">
        <div>DD.MM.YYYY</div>
        <div>12:00 AM</div>
      </Button>
    </OverlayTrigger>
  );
};
