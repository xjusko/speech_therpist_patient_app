import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BsArrowLeftShort } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import { Paths } from "../../App";
import ConfrimModal from "../../components/ConfrimModal";
import { Types } from "../../components/ExerciseFilter";
import { useAuth } from "../../contexts/AuthContext";
import { fetchTaskById, postTaskAnswer } from "../../utils/ApiRequests";
import {
  FourChoice,
  FourChoiceAnswer,
  FourChoiceQuestion,
  FourChoicesTask,
} from "../../utils/CommonTypes";
import { shuffle } from "../../utils/TaskUtils";

function FourChoices() {
  const { state } = useLocation();
  const { taskType, taskId }: { taskId: string; taskType: string } = state;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shuffledQuestions, setShuffledQuestions] =
    useState<FourChoiceQuestion[]>();
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [picked, setPicked] = useState<string>("");
  const [taskAnswer, setTaskAnswer] = useState<
    { answer: FourChoiceAnswer[] }[]
  >([]);
  const [countCorrect, setCountCorrect] = useState(0);

  const { data: task, error } = useSWRImmutable<FourChoicesTask, AxiosError>(
    [taskId, user, taskType],
    fetchTaskById
  );

  useEffect(() => {
    if (!task) {
      return;
    }
    const shuffledQuestions = shuffle(task.questions);
    const shuffledOptions = shuffledQuestions.map((question) =>
      shuffle(Object.values(question.choices[0]).slice(-4) as string[])
    );
    setShuffledQuestions(shuffledQuestions);
    setShuffledOptions(shuffledOptions);
  }, [task]);

  if (!task || !shuffledQuestions || !shuffledOptions) {
    return <></>;
  }

  const question: FourChoice = shuffledQuestions[questionIndex].choices[0];
  const options: string[] = shuffledOptions[questionIndex];
  const questionsCount: number = shuffledQuestions.length;

  return (
    <div>
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
        <Row className="text-center mb-3 fs-1 fw-bold">
          <Col>Choose Correct Answer</Col>
        </Row>
        <Row className="text-center ">
          {task.type === Types.FOUR_CHOICES_IT ? (
            <ImageQuestion />
          ) : (
            <TextQuestion />
          )}
        </Row>

        <Row className="g-1 text-center mt-2">
          {options.map((data) =>
            task.type === Types.FOUR_CHOICES_IT ? (
              <TextOption key={data} data={data} />
            ) : (
              <ImageOption key={data} data={data} />
            )
          )}
        </Row>

        <Row className="text-center mt-5">
          <Col>
            <Button
              size="lg"
              variant="dark"
              onClick={handleNextClick}
              disabled={!isAnswered}
            >
              Next
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );

  function handleNextClick() {
    if (!task || !question) {
      return;
    }

    if (questionsCount - 1 === questionIndex) {
      postTaskAnswer(user, task.id, task.type, taskAnswer);

      navigate(Paths.ExerciseSummary, {
        state: {
          totalQuestions: questionsCount,
          correctQuestions: countCorrect,
        },
      });
      return;
    }

    setPicked("");
    setIsAnswered(false);
    setQuestionIndex((prev) => prev + 1);
  }

  function handleOptionClick(data: string) {
    if (!question) {
      return;
    }
    setPicked(data);
    setIsAnswered(true);
    const isCorrect = data === question.correct_option;
    if (isCorrect) {
      setCountCorrect((prev) => prev + 1);
    }
    const answer: FourChoiceAnswer[] = [
      {
        ...question,
        chosen_option: data,
        is_correct: isCorrect,
      },
    ];
    setTaskAnswer((prev) => [...prev, { answer: answer }]);
  }

  function TextOption({ data }: { data: string }) {
    return (
      <Col
        xs={12}
        sm={6}
        className="fs-2 d-flex justify-content-center align-items-center"
      >
        <Button
          onClick={() => handleOptionClick(data)}
          disabled={isAnswered}
          variant="outline-dark"
          style={{
            height: "15vw",
            width: "100%",
            maxHeight: "100px",
            border: getOptionBorder(data),
            fontSize: "1.3rem",
          }}
        >
          {data}
        </Button>
      </Col>
    );
  }

  function ImageOption({ data }: { data: string }) {
    return (
      <Col
        xs={6}
        className="fs-2 d-flex justify-content-center align-items-center"
      >
        <Button
          onClick={() => handleOptionClick(data)}
          disabled={isAnswered}
          variant="outline-dark"
          style={{
            height: "40vw",
            width: "40vw",
            maxHeight: "250px",
            maxWidth: "250px",
            border: "none",
          }}
        >
          <img
            src={data}
            width="100%"
            height="100%"
            style={{ objectFit: "cover", border: getOptionBorder(data) }}
          />
        </Button>
      </Col>
    );
  }

  function ImageQuestion() {
    if (!question) {
      return <div></div>;
    }
    return (
      <Col>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            border: "3px solid black",
            height: "80vw",
            maxHeight: "500px",
          }}
        >
          <img
            src={question.question_data}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Col>
    );
  }

  function TextQuestion() {
    if (!question) {
      return <div></div>;
    }
    return (
      <Col>
        <div
          className="d-flex justify-content-center align-items-center fw-bold"
          style={{
            border: "3px solid black",
            fontSize: "2rem",
          }}
        >
          {question.question_data}
        </div>
      </Col>
    );
  }

  function getOptionBorder(data: string) {
    if (!question) {
      return "";
    }
    return picked === data || (isAnswered && question.correct_option === data)
      ? `5px solid ${data === question.correct_option ? "green" : "red"}`
      : "1px solid black";
  }
}

export default FourChoices;
