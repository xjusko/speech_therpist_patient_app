import React, { useState } from "react";
import { Button, NavLink, Stack } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import data from "../../data/tasks.json";
import { BackArrowIcon, HomeIcon } from "../../utils/CommonIcons";
import { ConnectColumn } from "../../components/ConnectColumn";

type Question = {
  id: number;
  text: string;
};

type ConnectTask = {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  questions: {
    leftOptions: {
      id: number;
      text: string;
    }[];
    rightOptions: {
      id: number;
      text: string;
    }[];
  }[];
};

function Connect() {
  const { id } = useParams();
  const task: ConnectTask = data.tasks.find((i) => i.id === id);
  const questionsCount = task.questions.length;

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [leftOptions, setLeftOptions] = useState(task.questions[0].leftOptions);
  const [rightOptions, setRightOptions] = useState(
    task.questions[0].rightOptions
  );

  return (
    <div>
      <div className="d-flex mx-4 justify-content-between">
        <NavLink href="/taskmenu">
          <BackArrowIcon />
        </NavLink>
        <div className="d-flex justify-content-center align-items-center">{`${
          questionIndex + 1
        } / ${questionsCount}`}</div>
        <NavLink href="/">
          <HomeIcon />
        </NavLink>
      </div>
      <div className="mx-4 my-5">
        <div className="fs-1 fw-bold font-monospace text-center ">
          Pair by dragging
        </div>
        <Stack
          direction="horizontal"
          className="gap-2 my-4 text-center justify-content-center"
        >
          {ConnectColumn(leftOptions, setLeftOptions)}
          {ConnectColumn(rightOptions, setRightOptions)}
        </Stack>
        <div className="text-center">
          <Button
            variant="dark"
            size="lg"
            onClick={isChecked ? handleNextButtonClick : handleCheckButtonClick}
          >
            {isChecked ? "Next" : "Check"}
          </Button>
        </div>
      </div>
    </div>
  );

  function handleCheckButtonClick(): void {
    setIsChecked(true);
    setLeftOptions(task.questions[questionIndex].leftOptions);
    setRightOptions(task.questions[questionIndex].rightOptions);
  }

  function handleNextButtonClick(): void {
    if (!task) {
      return;
    }
    if (questionsCount - 1 === questionIndex) {
      navigate(`/taskfinish/${id}`);
      return;
    }
    setQuestionIndex((prev) => {
      setIsChecked(false);
      setLeftOptions(task.questions[prev + 1].leftOptions);
      setRightOptions(task.questions[prev + 1].rightOptions);
      return prev + 1;
    });
  }
}

export default Connect;
