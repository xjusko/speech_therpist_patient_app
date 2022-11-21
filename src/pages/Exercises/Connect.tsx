import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { BsArrowLeftShort } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../App";
import ConfrimModal from "../../components/ConfrimModal";
import { ConnectColumn } from "../../components/ConnectColumn";
import { useAuth } from "../../contexts/AuthContext";
import { fetchTaskById, postTaskAnswer } from "../../utils/ApiRequests";
import {
  Pair,
  PairAnswer,
  ConnectTask,
  ConnectAnswer,
} from "../../utils/CommonTypes";
import { shuffle } from "../../utils/TaskUtils";

function Connect() {
  const { state } = useLocation();
  const { taskType, taskId }: { taskId: string; taskType: string } = state;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [task, setTask] = useState<ConnectTask>();
  const [isChecked, setIsChecked] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [leftOptions, setLeftOptions] = useState<Pair[]>();
  const [rightOptions, setRightOptions] = useState<Pair[]>();
  const [taskAnswer, setTaskAnswer] = useState<{ answer: ConnectAnswer }[]>([]);
  const [isOrdered, setIsOrdered] = useState(true);
  const [countCorrect, setCountCorrect] = useState(0);

  useEffect(() => {
    fetchTaskById(taskId, user, taskType).then((data) => {
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
    ? taskAnswer[questionIndex].answer.map((answer) => answer.is_correct)
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
        <ConfrimModal
          component={
            <BsArrowLeftShort
              style={{ width: "3rem", height: "3rem", opacity: "50%" }}
            />
          }
          confirmAction={() => navigate(-1)}
          title="Do you wish to exit the exercise?"
          body="Your answers will not be saved."
        />
        <div className="d-flex justify-content-center align-items-center">{`${
          questionIndex + 1
        } / ${questionsCount}`}</div>
      </div>
      <div className="mx-4 my-5">
        <div className="fs-1 fw-bold text-uppercase text-center ">
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
    let questionAnswer: ConnectAnswer = [];
    let isOrderCorrect = true;
    for (
      let index = 0;
      index < task.questions[questionIndex].choices.length;
      index++
    ) {
      // comapre patient answer with correct answer
      const isCorrect = task.questions[questionIndex].choices.some(
        (choice) =>
          choice.data1 === leftOptions[index].data1 &&
          choice.data2 === rightOptions[index].data2
      );
      // save answer in required way
      const choiceAnswer: PairAnswer = {
        data1: leftOptions[index].data1,
        data2: rightOptions[index].data2,
        is_correct: isCorrect,
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
      postTaskAnswer(user, task.id, task.type, taskAnswer);
      // pass total and correct questions to display result on summary screen
      navigate(Paths.ExerciseSummary, {
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

export default Connect;
