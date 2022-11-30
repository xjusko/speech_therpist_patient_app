import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  OverlayTrigger,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { IconType } from "react-icons";
import {
  BsBuilding,
  BsFillEnvelopeFill,
  BsGeoAltFill,
  BsTelephoneFill,
} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { Paths } from "../App";
import Notification from "../components/Notification";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { fetchTherapistInfo } from "../utils/ApiRequests";
import { TherapistProfileInfo } from "../utils/CommonTypes";

function TherapistProfile() {
  const { state }: { state: { therapistId: string } } = useLocation();
  const { user } = useAuth();
  const { profileData } = useProfile();
  const [tabKey, settabKey] = useState("bio");
  const navigate = useNavigate();

  const { data: therapist } = useSWR<TherapistProfileInfo>(
    [state.therapistId, user],
    fetchTherapistInfo,
    {
      onError() {
        navigate(Paths.UnexpectedError);
      },
    }
  );

  if (!therapist) {
    return <div></div>;
  }
  const contactIconStyle = { width: "2rem", height: "2rem" };
  const contactTextClassName = "fs-3 ms-2 my-1";
  return (
    <div className="mx-4">
      <Card
        style={{ background: "none", border: "none" }}
        className="mt-1 text-dark d-flex"
      >
        <div className="d-flex justify-content-center align-items-center">
          <Card.Img
            className="d-flex justify-content-center align-items-center"
            src={therapist.image}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              height: "60vw",
              width: "60vw",
              maxHeight: "400px",
              maxWidth: "400px",
            }}
          />
        </div>
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-center fs-1">
            {therapist.name}
          </Card.Title>

          <Card.Subtitle className="mt-4 d-flex align-items-center justify-content-center fs-3">
            <span className="fw-bold fs-1 me-1">
              {therapist.assigned_patients_count}
            </span>
            <span>patients</span>
          </Card.Subtitle>
          <Tabs
            id="controlled-tab"
            activeKey={tabKey}
            onSelect={(key) => settabKey(key!)}
            className="mb-3 mt-5"
            justify
          >
            <Tab eventKey="bio" title="Bio" tabClassName="text-black fw-bold">
              <Card.Text className="fs-4">{therapist.bio}</Card.Text>
            </Tab>

            <Tab
              eventKey="contact"
              title="Contact"
              tabClassName="text-black fw-bold"
            >
              <Contact
                text={therapist.email}
                Icon={BsFillEnvelopeFill}
              ></Contact>
              <Contact text={therapist.phone} Icon={BsTelephoneFill}></Contact>
              <Contact text={therapist.location} Icon={BsGeoAltFill}></Contact>
              <Contact text={therapist.company} Icon={BsBuilding}></Contact>
            </Tab>
            <Tab
              eventKey="events"
              title="Consultations"
              tabClassName={
                profileData.assignment_active
                  ? "text-black fw-bold"
                  : "text-gray"
              }
              disabled={!profileData.assignment_active}
            >
              <Card.Text className="fs-2 mb-0">Upcoming events</Card.Text>
              <Stack
                direction="horizontal"
                className="d-flex gap-3"
                style={{ flexWrap: "nowrap", overflowX: "auto" }}
              >
                {profileData.my_meetings.map((meeting) => (
                  <EventButton start={new Date(meeting.start_time)} />
                ))}
              </Stack>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );

  function Contact({ Icon, text }: { Icon: IconType; text: string }) {
    return (
      <div className="d-flex align-items-center" style={{ height: "50px" }}>
        <div>
          <Icon style={contactIconStyle} />
        </div>
        <div className={contactTextClassName}>{text}</div>
      </div>
    );
  }
}

export default TherapistProfile;

const renderTooltip = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    Simple tooltip
  </Tooltip>
);
const EventButton = ({ start }: { start: Date }) => {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant="success" className="text-center gap-2 my-3">
        <div>{start.toLocaleDateString("sv")}</div>
        <div>{start.toLocaleTimeString("sv")}</div>
      </Button>
    </OverlayTrigger>
  );
};
