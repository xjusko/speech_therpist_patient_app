import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { VscDebugRestart } from "react-icons/vsc";
import QuickTaskButton from "../components/QuickTaskButton";
import { motion } from "framer-motion";
import { animateClick } from "../utils/AnimationSettings";

function ExerciseSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { totalQuestions, correctQuestions } = state;
  return (
    <div className="d-flex flex-column mx-5">
      <div className="fs-1 text-uppercase text-center my-5">
        Exercise Finished!
      </div>
      {/* Task result */}
      <div className="fs-3 text-center my-2">{`Correct: ${correctQuestions}/${totalQuestions}`}</div>
      <div className="fs-3 text-center my-2">{`Success Rate: ${(
        (correctQuestions / totalQuestions) *
        100
      ).toFixed(1)}%`}</div>
      <div className="mt-5 d-flex align-items-center justify-content-center">
        <QuickTaskButton
          imageStyle={{ width: "4rem", height: "4rem" }}
          buttonStyle={{ width: "8rem", height: "8rem", border: "none" }}
        />
        <motion.div {...animateClick}>
          <Button
            variant="outline-dark"
            onClick={() => navigate(-1)}
            style={{ width: "8rem", height: "8rem", border: "none" }}
          >
            <VscDebugRestart size="4rem" />
            <div className="text-center text-uppercase">Restart Exercise</div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ExerciseSummary;
