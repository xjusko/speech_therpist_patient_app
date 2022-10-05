import React from "react";
import { Button, NavLink } from "react-bootstrap";
import { useParams } from "react-router-dom";
import QuickTaskButton from "../components/QuickTaskButton";

type TaskFinishScreenProps = {
  totalQuestions: number;
  correctQuestions: number;
};

function TaskFinishScreen() {
  const { qid } = useParams();
  return (
    <div className="d-flex flex-column mx-5 vh-100">
      <div className="fs-1 text-uppercase font-monospace text-center my-5">
        Task Finished!
      </div>
      <div className="fs-3 text-center my-2">{`Correct: ${6}/${7}`}</div>
      <div className="fs-3 text-center my-2">{`Success Rate: ${(
        (6 / 7) *
        100
      ).toFixed(1)}%`}</div>
      <div className="mt-auto mb-2 d-flex flex-column align-items-center">
        <QuickTaskButton
          imageStyle={{ width: "4rem", height: "4rem" }}
          buttonStyle={{ width: "6rem", height: "6rem", border: "none" }}
        />
        <div className="d-flex justify-content-center">Quick Task</div>
      </div>
      <div className="mb-2 mt-auto d-flex justify-content-center ">
        <NavLink href="/taskmenu">
          <Button variant="dark" size="lg" style={{ width: "250px" }}>
            Choose Another Task
          </Button>
        </NavLink>
      </div>
      <div className="mb-auto d-flex justify-content-center">
        <NavLink href="/">
          <Button variant="dark" size="lg" style={{ width: "250px" }}>
            Go To Home Page
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default TaskFinishScreen;
