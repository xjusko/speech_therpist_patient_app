import { useLocation } from "react-router-dom";
import QuickTaskButton from "../components/QuickTaskButton";

function TaskSummary() {
  const { state } = useLocation();
  const { totalQuestions, correctQuestions } = state;
  return (
    <div className="d-flex flex-column mx-5">
      <div className="fs-1 text-uppercase text-center my-5">Task Finished!</div>
      {/* Task result */}
      <div className="fs-3 text-center my-2">{`Correct: ${correctQuestions}/${totalQuestions}`}</div>
      <div className="fs-3 text-center my-2">{`Success Rate: ${(
        (correctQuestions / totalQuestions) *
        100
      ).toFixed(1)}%`}</div>
      <div className="mt-5 d-flex flex-column align-items-center">
        <QuickTaskButton
          imageStyle={{ width: "4rem", height: "4rem" }}
          buttonStyle={{ width: "8rem", height: "8rem", border: "none" }}
        />
      </div>
    </div>
  );
}

export default TaskSummary;
