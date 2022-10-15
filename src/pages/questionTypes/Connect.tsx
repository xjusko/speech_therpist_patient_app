import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmTaskExitModal from "../../components/ConfirmTaskExitModal";
import { ConnectColumn } from "../../components/ConnectColumn";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchConnectTask,
  postConnectTaskAnswers,
} from "../../utils/ApiRequests";
import { BackArrowIcon, HomeIcon } from "../../utils/CommonIcons";
import {
  Choice,
  ChoiceAnswer,
  ConnectTask,
  QuestionAnswer,
} from "../../utils/TaskTypes";

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
      // shuffle question order in task
      const shuffledQuestions = shuffle(data.questions);
      setTask({ ...data, questions: shuffledQuestions });
      // set each column with shuffled question choices
      setLeftOptions(shuffle(shuffledQuestions[0].choices));
      setRightOptions(shuffle(shuffledQuestions[0].choices));
    });
  }, []);

  // prevent error when rendering page before fetching data from api
  if (!task || !leftOptions || !rightOptions) {
    return <div></div>;
  }
  const questionsCount: number = task.questions.length;

  // boolean values for displaying correct and incorrect pairs
  const booleanAnswers = taskAnswer[questionIndex]
    ? taskAnswer[questionIndex].answer.map((answer) => answer.isCorrect)
    : null;

  // set button handler based on current question state
  const buttonHandler = isChecked
    ? isOrdered
      ? handleNextButtonClick
      : handleOrderButtonClick
    : handleCheckButtonClick;

  // set button based on current question state
  const buttonText = isChecked ? (isOrdered ? "Next" : "Order") : "Check";

  return (
    <div>
      {/* Display Home and Back buttons */}
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
        {/* Display each column of choices to be reordered */}
        <Stack
          direction="horizontal"
          className="gap-2 my-4 text-center justify-content-center"
        >
          <ConnectColumn
            choices={leftOptions}
            setChoices={setLeftOptions}
            isImage={false}
            answer={booleanAnswers}
          />
          <ConnectColumn
            choices={rightOptions}
            setChoices={setRightOptions}
            isImage={true}
            answer={booleanAnswers}
          />
        </Stack>
        <div className="text-center">
          <Button variant="dark" size="lg" onClick={buttonHandler}>
            {buttonText}
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
      // comapre patient answer with correct answer
      const isCorrect = task.questions[questionIndex].choices.some(
        (choice) =>
          choice.text === leftOptions[index].text &&
          choice.image === rightOptions[index].image
      );
      // save answer in required way
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

  // reorder columns only if answer is incorrect
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
    // post answers if it is the last question and navigate to task summary screen
    if (questionsCount - 1 === questionIndex) {
      postConnectTaskAnswers(user, task.id, taskAnswer);
      // pass total and correct questions to display result on summary screen
      navigate("/tasksummary", {
        state: {
          totalQuestions: questionsCount,
          correctQuestions: countCorrect,
        },
      });
      return;
    }
    // otherwise display next question
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
