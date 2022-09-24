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
    <div className="d-flex flex-column mx-5 my-5">
      <div>Task Finished!</div>
      <div>{`Correct: ${6}/${7}`}</div>
      <div>{`Success Rate: ${((6 / 7) * 100).toFixed(1)}%`}</div>
      <div>
        <NavLink href="/taskmenu" as={NavLink}>
          <Button>Choose Another Exercise</Button>
        </NavLink>
        <NavLink href="/" as={NavLink}>
          <Button>Go To Home Page</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default TaskFinishScreen;
