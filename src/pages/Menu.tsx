import React from "react";
import { Button, Col, Nav, NavLink, Row } from "react-bootstrap";
import {
  BsBell,
  BsBoxArrowLeft,
  BsController,
  BsJournalCheck,
  BsPersonFill,
} from "react-icons/bs";
import QuickTaskButton from "../components/QuickTaskButton";
import { useAuth } from "../contexts/AuthContext";
import { FireStreakIcon } from "../utils/CommonIcons";

function Menu() {
  const { setUser } = useAuth();
  const mainButtonStyle = {
    height: "40vw",
    width: "40vw",
    maxHeight: "250px",
    maxWidth: "250px",
    border: "none",
    borderRadius: "2rem",
  };
  const imageStyle = {
    height: "30vw",
    width: "30vw",
    maxHeight: "200px",
    maxWidth: "200px",
  };
  return (
    <div className="d-flex flex-column mx-4 min-vh-100">
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
      <Row xs={2} className="g-2 text-center mt-2">
        <Col>
          <NavLink href="/taskmenu">
            <Button variant="outline-dark" style={mainButtonStyle}>
              <BsController style={imageStyle} />
              <div className="mt-2">TASKS</div>
            </Button>
          </NavLink>
        </Col>
        <Col>
          <NavLink href="/routine">
            <Button variant="outline-dark" style={mainButtonStyle}>
              <BsJournalCheck style={imageStyle} />
              <div className="mt-2">MY ROUTINE</div>
            </Button>
          </NavLink>
        </Col>
      </Row>
      <Row xs={2} className="mt-2 g-2 text-center">
        <Col>
          <QuickTaskButton
            imageStyle={imageStyle}
            buttonStyle={mainButtonStyle}
          >
            <div className="mt-2">QUICK TASK</div>
          </QuickTaskButton>
        </Col>
        <Col>
          <NavLink href="/findtherapist">
            <Button variant="outline-dark" style={mainButtonStyle}>
              <BsPersonFill style={imageStyle} />
              <div className="mt-2">MY THERAPIST</div>
            </Button>
          </NavLink>
        </Col>
      </Row>
      <Row xs={1} sm={2} className="my-5 gap-2 justify-content-center">
        <Col
          xs={10}
          sm={5}
          style={{ border: "2px solid black", borderRadius: "16px" }}
        >
          <div className="d-flex mx-2 my-2 align-items-center">
            <FireStreakIcon />
            <div className="d-flex flex-column">
              <div className="ms-2 fs-1 fw-bold">12</div>
              <div className="ms-2">Day streak</div>
            </div>
          </div>
        </Col>
        <Col
          xs={10}
          sm={5}
          style={{ border: "2px solid black", borderRadius: "16px" }}
        >
          <div className="d-flex mx-2 my-2 align-items-center">
            <BsBell style={{ height: "3rem", width: "3rem" }} />
            <div className="d-flex flex-column">
              <div className="ms-2 fs-1 fw-bold">3</div>
              <div className="ms-2">Tasks to do</div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-auto mb-3 text-dark fs-2 text-center">
        <Col>
          <NavLink href="/login" onClick={() => setUser("")}>
            <BsBoxArrowLeft style={{ height: "3rem", width: "3rem" }} />
            <div className="ms-2" style={{ fontSize: "1rem" }}>
              Log Out
            </div>
          </NavLink>
        </Col>
      </Row>
    </div>
  );
}

export default Menu;
