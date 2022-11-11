import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../App";
import ConfrimModal from "../../components/ConfrimModal";
import data from "../../data/fourchoices.json";
import { FourChoicesTask } from "../../utils/CommonTypes";

function FourChoices() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task: FourChoicesTask = data;
  const questionsCount = task.questions.length;
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [question, setQuestion] = useState({
    index: 0,
    main: task.questions[0].main,
    choices: task.questions[0].options,
  });

  function handleNextClick() {
    setIsAnswered(false);
    if (questionsCount - 1 === question.index) {
      navigate(Paths.TaskSummary);
      return;
    }
    setQuestion((prev) => ({
      index: prev.index + 1,
      main: task.questions[prev.index + 1].main,
      choices: task.questions[prev.index + 1].options,
    }));
  }

  function handleChoiceClick(itemId: number) {
    setAnswers((prev) => [...prev, itemId]);
    setIsAnswered(true);
  }

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
          question.index + 1
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
                src={question.main.image}
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Col>
        </Row>

        <Row xs={2} className="g-4 text-center mt-2 mx-2">
          {question.choices.map((item) => (
            <Col
              className="fs-2 d-flex justify-content-center align-items-center"
              key={item.id}
            >
              <Button
                onClick={(event) => handleChoiceClick(item.id)}
                size="lg"
                variant="outline-dark"
                disabled={isAnswered}
                style={{
                  height: "15vw",
                  width: "100%",
                  maxHeight: "100px",
                  border:
                    isAnswered && item.id === 1
                      ? "5px solid green"
                      : "1px solid black",
                }}
              >
                {item.text}
              </Button>
            </Col>
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
}

export default FourChoices;
