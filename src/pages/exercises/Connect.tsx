import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { BsArrowLeftShort } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../App";
import useSWRImmutable from "swr/immutable";
import ConfrimModal from "../../components/ConfrimModal";
import { ConnectColumn } from "../../components/ConnectColumn";
import { useAuth } from "../../contexts/AuthContext";
import { fetchTaskById, postTaskAnswer } from "../../utils/ApiRequests";
import {
  Pair,
  PairAnswer,
  ConnectTask,
  ConnectAnswer,
  ConnectQuestion,
} from "../../utils/CommonTypes";
import { shuffle } from "../../utils/TaskUtils";
import { AxiosError } from "axios";
import { Types } from "../../components/ExerciseFilter";

function Connect() {
  const { state } = useLocation();
  const { taskType, taskId }: { taskId: string; taskType: string } = state;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] =
    useState<ConnectQuestion[]>();
  const [leftOptions, setLeftOptions] = useState<string[]>();
  const [rightOptions, setRightOptions] = useState<string[]>();
  const [taskAnswer, setTaskAnswer] = useState<{ answer: ConnectAnswer }[]>([]);
  const [isOrdered, setIsOrdered] = useState(true);
  const [countCorrect, setCountCorrect] = useState(0);

  const { data, error } = useSWRImmutable<ConnectTask, AxiosError>(
    [taskId, user, taskType],
    fetchTaskById
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    // shuffle question order in task
    const shuffledQuestions: ConnectQuestion[] = shuffle(data.questions);
    setShuffledQuestions(shuffledQuestions);
    // set each column with shuffled question choices
    setLeftOptions(
      shuffle(shuffledQuestions[0].choices.map((pair) => pair.data1))
    );
    setRightOptions(
      shuffle(shuffledQuestions[0].choices.map((pair) => pair.data2))
    );
  }, [data]);

  // prevent error when rendering page before fetching data from api
  if (!data || !shuffledQuestions || !leftOptions || !rightOptions) {
    return <div></div>;
  }
  const questionsCount: number = shuffledQuestions.length;

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
      <div className="mx-4 my-3">
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
            isImage={data.type === Types.CONNECT_PAIRS_TI}
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
    if (!shuffledQuestions || !leftOptions || !rightOptions) {
      return;
    }
    let questionAnswer: ConnectAnswer = [];
    let isOrderCorrect = true;
    for (
      let index = 0;
      index < shuffledQuestions[questionIndex].choices.length;
      index++
    ) {
      // comapre patient answer with correct answer
      const isCorrect = shuffledQuestions[questionIndex].choices.some(
        (choice) =>
          choice.data1 === leftOptions[index] &&
          choice.data2 === rightOptions[index]
      );
      // save answer in required way
      const choiceAnswer: PairAnswer = {
        data1: leftOptions[index],
        data2: rightOptions[index],
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
    if (!shuffledQuestions) {
      return;
    }
    setIsOrdered(true);
    setLeftOptions(
      shuffledQuestions[questionIndex].choices.map((pair) => pair.data1)
    );
    setRightOptions(
      shuffledQuestions[questionIndex].choices.map((pair) => pair.data2)
    );
  }

  function handleNextButtonClick(): void {
    if (!data || !shuffledQuestions) {
      return;
    }
    // post answers if it is the last question and navigate to task summary screen
    if (questionsCount - 1 === questionIndex) {
      postTaskAnswer(user, data.id, data.type, taskAnswer);
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
      setLeftOptions(
        shuffle(shuffledQuestions[prev + 1].choices.map((pair) => pair.data1))
      );
      setRightOptions(
        shuffle(shuffledQuestions[prev + 1].choices.map((pair) => pair.data2))
      );
      return prev + 1;
    });
  }
}

export default Connect;
