import React from "react";
import { Button, NavLink } from "react-bootstrap";
import { useParams } from "react-router-dom";

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
      <div className="mt-auto mb-2 d-flex justify-content-center">
        <NavLink href="/taskmenu" as={NavLink}>
          <Button variant="dark" size="lg" style={{ width: "250px" }}>
            Choose Another Task
          </Button>
        </NavLink>
      </div>
      <div className="mb-auto d-flex justify-content-center">
        <NavLink href="/" as={NavLink}>
          <Button variant="dark" size="lg" style={{ width: "250px" }}>
            Go To Home Page
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default TaskFinishScreen;
