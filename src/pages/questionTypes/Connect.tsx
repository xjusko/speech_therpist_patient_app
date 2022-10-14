import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { BackArrowIcon, HomeIcon } from "../../utils/CommonIcons";
import { ConnectColumn } from "../../components/ConnectColumn";
import ConfirmTaskExitModal from "../../components/ConfirmTaskExitModal";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchConnectTask,
  postConnectTaskAnswers,
} from "../../utils/ApiRequests";

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

type QuestionAnswer = ChoiceAnswer[];

type ChoiceAnswer = { data1: string; data2: string; isCorrect: boolean };

function Connect() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [task, setTask] = useState<ConnectTask>();
  const [isChecked, setIsChecked] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [leftOptions, setLeftOptions] = useState<Choice[]>();
  const [rightOptions, setRightOptions] = useState<Choice[]>();
  const [taskAnswer, setTaskAnswer] = useState<{ answer: QuestionAnswer }[]>(
    []
  );
  const [isOrdered, setIsOrdered] = useState(true);
  const [countCorrect, setCountCorrect] = useState(0);

  useEffect(() => {
    fetchConnectTask(id, user).then((data) => {
      const shuffledQuestions = shuffle(data.questions);
      setTask({ ...data, questions: shuffledQuestions });
      setLeftOptions(shuffle(shuffledQuestions[0].choices));
      setRightOptions(shuffle(shuffledQuestions[0].choices));
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
            answer={
              taskAnswer[questionIndex]
                ? taskAnswer[questionIndex].answer.map(
                    (answer) => answer.isCorrect
                  )
                : null
            }
          />
          <ConnectColumn
            choices={rightOptions}
            setChoices={setRightOptions}
            isImage={true}
            answer={
              taskAnswer[questionIndex]
                ? taskAnswer[questionIndex].answer.map(
                    (answer) => answer.isCorrect
                  )
                : null
            }
          />
        </Stack>
        <div className="text-center">
          <Button
            variant="dark"
            size="lg"
            onClick={
              isChecked
                ? isOrdered
                  ? handleNextButtonClick
                  : handleOrderButtonClick
                : handleCheckButtonClick
            }
          >
            {isChecked ? (isOrdered ? "Next" : "Order") : "Check"}
          </Button>
        </div>
      </div>
    </div>
  );

  function handleCheckButtonClick(): void {
    if (!task || !leftOptions || !rightOptions) {
      return;
    }
    let questionAnswer: QuestionAnswer = [];
    let isOrderCorrect = true;
    for (
      let index = 0;
      index < task.questions[questionIndex].choices.length;
      index++
    ) {
      const isCorrect = task.questions[questionIndex].choices.some(
        (choice) =>
          choice.text === leftOptions[index].text &&
          choice.image === rightOptions[index].image
      );
      const choiceAnswer: ChoiceAnswer = {
        data1: leftOptions[index].text,
        data2: rightOptions[index].image,
        isCorrect: isCorrect,
      };
      questionAnswer = [...questionAnswer, choiceAnswer];
      isOrderCorrect = isOrderCorrect && isCorrect;
    }
    setTaskAnswer((prev) => [...prev, { answer: questionAnswer }]);
    setIsChecked(true);
    setIsOrdered(isOrderCorrect);
    if (isOrderCorrect) {
      setCountCorrect((prev) => prev + 1);
    }
  }

  function handleOrderButtonClick(): void {
    if (!task) {
      return;
    }
    setIsOrdered(true);
    setLeftOptions(task.questions[questionIndex].choices);
    setRightOptions(task.questions[questionIndex].choices);
  }

  function handleNextButtonClick(): void {
    if (!task) {
      return;
    }
    if (questionsCount - 1 === questionIndex) {
      postConnectTaskAnswers(user, task.id, taskAnswer);
      navigate("/taskfinish", {
        state: {
          totalQuestions: questionsCount,
          correctQuestions: countCorrect,
        },
      });
      return;
    }
    setQuestionIndex((prev) => {
      setIsChecked(false);
      setLeftOptions(shuffle(task.questions[prev + 1].choices));
      setRightOptions(shuffle(task.questions[prev + 1].choices));
      return prev + 1;
    });
  }
}

function shuffle(array: any[]) {
  const result = [...array].sort(() => Math.random() - 0.5);
  return result;
}

export default Connect;
