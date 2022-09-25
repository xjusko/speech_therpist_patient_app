import React, { useState } from "react";
import { Button, NavLink, Stack } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { DropResult } from "react-beautiful-dnd";
import data from "../../data/tasks.json";
import ConnectDraggableColumn from "../../components/ConnectDraggableColumn";
import { BackArrowIcon, HomeIcon } from "../../utils/CommonIcons";

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
    firstOptions: {
      id: number;
      text: string;
    }[];
    secondOptions: {
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
  const [questions, setQuestions] = useState({
    questionIndex: 0,
    firstOptions: task.questions[0].firstOptions,
    secondOptions: task.questions[0].secondOptions,
  });

  const reorder = (list: Question[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function handleDragLeft(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      questions.firstOptions,
      result.source.index,
      result.destination.index
    );
    setQuestions((prev) => ({
      ...prev,
      firstOptions: items,
    }));
  }

  function handleDragRight(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      questions.secondOptions,
      result.source.index,
      result.destination.index
    );
    setQuestions((prev) => ({
      ...prev,
      secondOptions: items,
    }));
  }
  return (
    <div>
      <div className="d-flex mx-4 justify-content-between">
        <NavLink href="/taskmenu" as={NavLink}>
          <BackArrowIcon />
        </NavLink>
        <div className="d-flex justify-content-center align-items-center">{`${
          questions.questionIndex + 1
        } / ${questionsCount}`}</div>
        <NavLink href="/" as={NavLink}>
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
          <ConnectDraggableColumn
            questions={questions.firstOptions}
            handleDrag={handleDragLeft}
          />
          <ConnectDraggableColumn
            questions={questions.secondOptions}
            handleDrag={handleDragRight}
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
    setIsChecked(true);
    setQuestions((prev) => ({
      ...prev,
      firstOptions: task.questions[prev.questionIndex].firstOptions,
      secondOptions: task.questions[prev.questionIndex].secondOptions,
    }));
  }

  function handleNextButtonClick(): void {
    if (!task) {
      return;
    }
    if (questionsCount - 1 === questions.questionIndex) {
      navigate(`/taskfinish/${id}`);
      return;
    }
    setQuestions((prev) => ({
      questionIndex: prev.questionIndex + 1,
      firstOptions: task.questions[prev.questionIndex + 1].firstOptions,
      secondOptions: task.questions[prev.questionIndex + 1].secondOptions,
    }));
  }
}

export default Connect;
