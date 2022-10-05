import React, { useState } from "react";
import {
  Button,
  Card,
  NavLink,
  Stack,
  Tooltip,
  OverlayTrigger,
  Tab,
  Tabs,
} from "react-bootstrap";
import {
  BsBuilding,
  BsFillEnvelopeFill,
  BsGeoAltFill,
  BsTelephoneFill,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import therapists from "../data/therapists.json";
import { BackArrowIcon, HomeIcon } from "../utils/CommonIcons";

function TherapistMainInfo() {
  const { id } = useParams();

  const therapist = therapists.find((i) => i.id === Number(id));
  if (!therapist) {
    return <div></div>;
  }
  const [tabKey, settabKey] = useState("bio");
  const contactIconStyle = { width: "2rem", height: "2rem" };
  const contactTextClassName = "fs-3 ms-2 my-1";
  return (
    <div className="mx-4">
      <div className="d-flex mt-1">
        <NavLink href="/findtherapist">
          <BackArrowIcon />
        </NavLink>
        <NavLink href="/" className="ms-auto">
          <HomeIcon />
        </NavLink>
      </div>
      <Card
        style={{ background: "none", border: "none" }}
        className="mt-1 text-dark d-flex"
      >
        <div className="d-flex justify-content-center align-items-center">
          <Card.Img
            className="d-flex justify-content-center align-items-center"
            src={therapist.imageUrl}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              height: "80vw",
              maxHeight: "550px",
            }}
          />
        </div>
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-center fs-1">
            {therapist.firstName} {therapist.lastName}
          </Card.Title>

          <Card.Subtitle className="mt-4 d-flex align-items-center justify-content-center fs-3">
            <span className="fw-bold fs-1 me-1">15</span>
            <span>patients</span>
          </Card.Subtitle>
          <Tabs
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={(key) => settabKey(key)}
            className="mb-3 mt-5"
            justify
          >
            <Tab eventKey="bio" title="Bio" tabClassName="text-black">
              <Card.Text className="fs-4">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Tab>

            <Tab eventKey="contact" title="Contact" tabClassName="text-black">
              <div className="d-flex align-items-center">
                <div>
                  <BsFillEnvelopeFill style={contactIconStyle} />
                </div>
                <div className={contactTextClassName}>{therapist.email}</div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <BsTelephoneFill style={contactIconStyle} />
                </div>
                <div className={contactTextClassName}>{therapist.phone}</div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <BsGeoAltFill style={contactIconStyle} />
                </div>
                <div className={contactTextClassName}>
                  {therapist.city}, {therapist.location}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <BsBuilding style={contactIconStyle} />
                </div>
                <div className={contactTextClassName}>{therapist.email}</div>
              </div>
            </Tab>
            <Tab eventKey="events" title="Events" tabClassName="text-black">
              <Card.Text className="fs-2 mb-0">Upcoming events</Card.Text>
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
            </Tab>
          </Tabs>
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
