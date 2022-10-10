import React from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import QuickTaskButton from "../components/QuickTaskButton";

function TaskFinishScreen() {
  const { state } = useLocation();
  const { totalQuestions, correctQuestions } = state;
  return (
    <div className="d-flex flex-column mx-5 vh-100">
      <div className="fs-1 text-uppercase font-monospace text-center my-5">
        Task Finished!
      </div>
      <div className="fs-3 text-center my-2">{`Correct: ${correctQuestions}/${totalQuestions}`}</div>
      <div className="fs-3 text-center my-2">{`Success Rate: ${(
        (correctQuestions / totalQuestions) *
        100
      ).toFixed(1)}%`}</div>
      <div className="mt-auto mb-2 d-flex flex-column align-items-center">
        <QuickTaskButton
          imageStyle={{ width: "4rem", height: "4rem" }}
          buttonStyle={{ width: "8rem", height: "8rem", border: "none" }}
        >
          <div className="mt-2">QUICK TASK</div>
        </QuickTaskButton>
      </div>
      <div className="mb-2 mt-auto d-flex justify-content-center ">
        <Nav.Link to="/taskmenu" as={NavLink}>
          <Button variant="dark" size="lg" style={{ width: "250px" }}>
            Choose Another Task
          </Button>
        </Nav.Link>
      </div>
      <div className="mb-auto d-flex justify-content-center">
        <Nav.Link to="/" as={NavLink}>
          <Button variant="dark" size="lg" style={{ width: "250px" }}>
            Go To Home Page
          </Button>
        </Nav.Link>
      </div>
    </div>
  );
}

export default TaskFinishScreen;
