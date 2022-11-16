import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BsArrowLeftShort } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../App";
import ConfrimModal from "../../components/ConfrimModal";
import { useAuth } from "../../contexts/AuthContext";
import { fetchTaskById, postTaskAnswer } from "../../utils/ApiRequests";
import {
  FourChoice,
  FourChoiceAnswer,
  FourChoicesTask,
} from "../../utils/CommonTypes";
import { shuffle } from "../../utils/TaskUtils";

function FourChoices() {
  const { state }: { state: { taskId: string; taskType: string } } =
    useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [task, setTask] = useState<FourChoicesTask>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<FourChoice>();
  const [options, setOptions] = useState<string[]>();
  const [isAnswered, setIsAnswered] = useState(false);
  const [picked, setPicked] = useState<string>("");
  const [taskAnswer, setTaskAnswer] = useState<{ answer: FourChoiceAnswer }[]>(
    []
  );
  const [countCorrect, setCountCorrect] = useState(0);

  useEffect(() => {
    fetchTaskById(state.taskId, user, state.taskType).then((data) => {
      // shuffle question order in task
      const shuffledQuestions = shuffle(data.questions);
      setTask({ ...data, questions: shuffledQuestions });
      setQuestion(shuffledQuestions[0].choices[0]);
      setOptions(
        shuffle(
          Object.values(shuffledQuestions[0].choices[0]).slice(-4) as string[]
        )
      );
    });
  }, []);

  if (!task || !question || !options) {
    return <div></div>;
  }

  const questionsCount: number = task.questions.length;
  console.log(taskAnswer);

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
          title="Do you wish to exit the task?"
          body="Your answers will not be saved."
        />
        <div className="d-flex justify-content-center align-items-center">{`${
          questionIndex + 1
        } / ${questionsCount}`}</div>
      </div>
      <div className="mx-4 my-5">
        <Row className="text-center mb-3 fs-1 fw-bold">
          <Col>Choose Correct Answer</Col>
        </Row>
        <Row className="text-center ">
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
        </Row>

        <Row xs={2} className="g-4 text-center mt-2 mx-2">
          {options.map((data) => (
            <Option key={data} data={data} />
          ))}
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

      navigate(Paths.TaskSummary, {
        state: {
          totalQuestions: questionsCount,
          correctQuestions: countCorrect,
        },
      });
      return;
    }
    const isCorrect = picked === question.correct_option;
    if (isCorrect) {
      setCountCorrect((prev) => prev + 1);
    }
    const answer: FourChoiceAnswer = {
      ...question,
      chosen_option: picked,
      is_correct: isCorrect,
    };
    setTaskAnswer((prev) => [...prev, { answer: answer }]);
    setPicked("");
    setIsAnswered(false);
    setQuestionIndex((prev) => {
      setQuestion(task.questions[prev + 1].choices[0] as FourChoice);
      setOptions(
        shuffle(
          Object.values(task.questions[prev + 1].choices[0]).slice(
            -4
          ) as string[]
        )
      );
      return prev + 1;
    });
  }

  function Option({ data }: { data: string }) {
    if (!question) {
      return <div></div>;
    }
    return (
      <Col className="fs-2 d-flex justify-content-center align-items-center">
        <Button
          onClick={() => {
            setPicked(data);
            setIsAnswered(true);
          }}
          disabled={isAnswered}
          size="lg"
          variant="outline-dark"
          style={{
            height: "15vw",
            width: "100%",
            maxHeight: "100px",
            border:
              picked === data ||
              (isAnswered && question.correct_option === data)
                ? `5px solid ${
                    data === question.correct_option ? "green" : "red"
                  }`
                : "1px solid black",
          }}
        >
          {data}
        </Button>
      </Col>
    );
  }
}

export default FourChoices;
