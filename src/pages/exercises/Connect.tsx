import { AxiosError } from "axios";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { BsArrowLeftShort, BsCheckLg, BsXLg } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import { Paths } from "../../App";
import ConfrimModal from "../../components/ConfrimModal";
import { Types } from "../../components/ExerciseFilter";
import { useAuth } from "../../contexts/AuthContext";
import { fetchTaskById, postTaskAnswer } from "../../utils/ApiRequests";
import {
  ConnectAnswer,
  ConnectQuestion,
  ConnectTask,
  PairAnswer,
} from "../../utils/CommonTypes";
import { shuffle } from "../../utils/TaskUtils";

function Connect() {
  const { state } = useLocation();
  const { taskType, taskId }: { taskId: string; taskType: string } = state;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] =
    useState<ConnectQuestion[]>();
  const [leftColumn, setLeftColumn] = useState<string[]>();
  const [rightColumn, setRightColumn] = useState<string[]>();
  const [taskAnswer, setTaskAnswer] = useState<{ answer: ConnectAnswer }[]>([]);
  const [isOrdered, setIsOrdered] = useState(true);
  const [countCorrect, setCountCorrect] = useState(0);

  const { data } = useSWRImmutable<ConnectTask, AxiosError>(
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
    setLeftColumn(
      shuffle(shuffledQuestions[0].choices.map((pair) => pair.data1))
    );
    setRightColumn(
      shuffle(shuffledQuestions[0].choices.map((pair) => pair.data2))
    );
  }, [data]);

  // prevent error when rendering page before fetching data from api
  if (!data || !shuffledQuestions || !leftColumn || !rightColumn) {
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
            choices={leftColumn}
            setChoices={setLeftColumn}
            isImage={false}
            answer={booleanAnswers}
          />
          <ConnectColumn
            choices={rightColumn}
            setChoices={setRightColumn}
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
    if (!shuffledQuestions || !leftColumn || !rightColumn) {
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
          choice.data1 === leftColumn[index] &&
          choice.data2 === rightColumn[index]
      );
      // save answer in required way
      const choiceAnswer: PairAnswer = {
        data1: leftColumn[index],
        data2: rightColumn[index],
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
    setLeftColumn(
      shuffledQuestions[questionIndex].choices.map((pair) => pair.data1)
    );
    setRightColumn(
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
      setLeftColumn(
        shuffle(shuffledQuestions[prev + 1].choices.map((pair) => pair.data1))
      );
      setRightColumn(
        shuffle(shuffledQuestions[prev + 1].choices.map((pair) => pair.data2))
      );
      return prev + 1;
    });
  }
}

type SetChoices = {
  (value: React.SetStateAction<string[] | undefined>): void;
  (value: React.SetStateAction<string[] | undefined>): void;
  (newOrder: any[]): void;
};

type ConnectColumnProps = {
  choices: string[];
  setChoices: SetChoices;
  isImage: boolean;
  answer: boolean[] | null;
};

export function ConnectColumn({
  choices,
  setChoices,
  isImage,
  answer,
}: ConnectColumnProps) {
  return (
    // This makes the column orderable
    <Reorder.Group
      axis="y"
      values={choices}
      onReorder={setChoices}
      style={{ padding: "0" }}
    >
      {/* Rendering the choices */}
      {choices.map((item, index) => (
        <Reorder.Item
          key={item}
          value={item}
          style={{
            // Removing list artifacts
            listStyle: "none",
            // blending image background with page background
            mixBlendMode: "multiply",
            fontSize: "1rem",
          }}
        >
          {/* Render image or text box based on recieved type */}
          <PairChoice isCorrect={answer && answer[index]}>
            {isImage ? (
              <img
                src={item}
                alt="image"
                draggable={false}
                height="100%"
                width="100%"
                style={{ borderRadius: "10px", objectFit: "cover" }}
              />
            ) : (
              <div className="fw-bold text-uppercase">{item}</div>
            )}
          </PairChoice>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

function PairChoice({
  isCorrect,
  children,
}: {
  isCorrect: boolean | null;
  children: React.ReactNode;
}) {
  const answerIconStyle: any = {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: "30%",
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center my-1"
      style={{
        height: "35vw",
        width: "40vw",
        border: "1px solid black",
        borderRadius: "10px",
        maxWidth: "290px",
        maxHeight: "250px",
        position: "relative",
      }}
    >
      {/* Content of choice */}
      {children}
      {/* Displays tick or cross after submitting answer */}
      {isCorrect != null &&
        (isCorrect ? (
          <BsCheckLg color="green" style={answerIconStyle} />
        ) : (
          <BsXLg color="red" style={answerIconStyle} />
        ))}
    </div>
  );
}

export default Connect;
