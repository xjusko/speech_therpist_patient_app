import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { BackArrowIcon, HomeIcon } from "../../utils/CommonIcons";
import { ConnectColumn } from "../../components/ConnectColumn";
import ConfirmTaskExitModal from "../../components/ConfirmTaskExitModal";
import { useAuth } from "../../contexts/AuthContext";

type Choice = {
  id: number;
  text: string;
  image: string;
};

type Question = {
  id: number;
  heading: string;
  choices: Choice[];
};

type ConnectTask = {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  created_by: number;
  questions: Question[];
  tags: string[];
};

function Connect() {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState<ConnectTask>();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [leftOptions, setLeftOptions] = useState<Choice[]>();
  const [rightOptions, setRightOptions] = useState<Choice[]>();

  useEffect(() => {
    fetch("http://172.26.5.2/api/task/tasks/", {
      headers: { Authorization: `Token ${user}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTask(data[0]);
        setLeftOptions(data[0].questions[0].choices);
        setRightOptions(data[0].questions[0].choices);
      });
  }, []);

  if (!task || !leftOptions || !rightOptions) {
    return <div></div>;
  }
  const questionsCount: number = task.questions.length;

  return (
    <div>
      <div className="d-flex mx-4 justify-content-between">
        <ConfirmTaskExitModal icon={<BackArrowIcon />} to="/taskmenu" />
        <div className="d-flex justify-content-center align-items-center">{`${
          questionIndex + 1
        } / ${questionsCount}`}</div>
        <ConfirmTaskExitModal icon={<HomeIcon />} to="/" />
      </div>
      <div className="mx-4 my-5">
        <div className="fs-1 fw-bold font-monospace text-center ">
          Pair by dragging
        </div>
        <Stack
          direction="horizontal"
          className="gap-2 my-4 text-center justify-content-center"
        >
          <ConnectColumn
            choices={leftOptions}
            setChoices={setLeftOptions}
            isImage={false}
          />
          <ConnectColumn
            choices={rightOptions}
            setChoices={setRightOptions}
            isImage={true}
          />
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
    if (!task) {
      return;
    }
    setIsChecked(true);
    setLeftOptions(task.questions[questionIndex].choices);
    setRightOptions(task.questions[questionIndex].choices);
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
      setLeftOptions(task.questions[prev + 1].choices);
      setRightOptions(task.questions[prev + 1].choices);
      return prev + 1;
    });
  }
}

export default Connect;
