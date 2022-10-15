import { Col, Nav, Row } from "react-bootstrap";
import {
  BsBell,
  BsBoxArrowLeft,
  BsController,
  BsJournalCheck,
  BsPersonFill,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import MenuMainButton, {
  mainButtonStyle,
  mainIconStyle,
} from "../components/MenuMainButton";
import QuickTaskButton from "../components/QuickTaskButton";
import { useAuth } from "../contexts/AuthContext";
import { FireStreakIcon } from "../utils/CommonIcons";

function Home() {
  const { setUser } = useAuth();

  return (
    <div className="d-flex flex-column mx-4 min-vh-100">
      {/* Title */}
      <Row>
        <Col className="d-flex flex-column mt-5 align-items-center text-dark">
          <div
            className="fw-bold font-monospace text-uppercase"
            style={{ fontSize: "50px" }}
          >
            Welcome
          </div>
          <div className="fs-1">To Speech Therapist</div>
        </Col>
      </Row>

      {/* Main menu buttons */}
      <Row xs={2} className="mt-2 g-2 text-center">
        <Col>
          <MenuMainButton
            Icon={BsController}
            buttonText="TASKS"
            navigateTo="/taskmenu"
          />
        </Col>
        <Col>
          <MenuMainButton
            Icon={BsJournalCheck}
            buttonText="MY ROUTINE"
            navigateTo="/routine"
          />
        </Col>
      </Row>
      <Row xs={2} className="mt-2 g-2 text-center">
        <Col>
          {/* Different from main buttons  */}
          <QuickTaskButton
            imageStyle={mainIconStyle}
            buttonStyle={mainButtonStyle}
          />
        </Col>
        <Col>
          <MenuMainButton
            Icon={BsPersonFill}
            buttonText="MY THERAPIST"
            navigateTo="/findtherapist"
          />
        </Col>
      </Row>

      {/* Main menu labels */}
      <Row xs={1} sm={2} className="my-5 gap-4 justify-content-center">
        <MenuLabel
          Icon={FireStreakIcon}
          labelNumber={12}
          labelText="Day streak"
        />
        <MenuLabel Icon={BsBell} labelNumber={3} labelText="Tasks to do" />
      </Row>

      {/* Log Out button */}
      <Row className="mt-auto mb-3 text-dark fs-2 text-center">
        <Col className="d-flex justify-content-center">
          <Nav.Link to="/login" onClick={() => setUser("")} as={NavLink}>
            <BsBoxArrowLeft style={{ height: "3rem", width: "3rem" }} />
            <div className="ms-2" style={{ fontSize: "1rem" }}>
              Log Out
            </div>
          </Nav.Link>
        </Col>
      </Row>
    </div>
  );
}

function MenuLabel({
  Icon,
  labelNumber,
  labelText,
}: {
  Icon: any;
  labelNumber: number;
  labelText: string;
}) {
  return (
    <Col
      xs={10}
      sm={5}
      style={{ border: "2px solid black", borderRadius: "16px" }}
    >
      <div className="d-flex mx-2 my-2 align-items-center">
        <Icon style={{ height: "3rem", width: "3rem" }} />
        <div className="d-flex flex-column">
          <div className="ms-2 fs-1 fw-bold">{labelNumber}</div>
          <div className="ms-2">{labelText}</div>
        </div>
      </div>
    </Col>
  );
}

export default Home;
