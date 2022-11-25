import { motion } from "framer-motion";
import React from "react";
import { Button } from "react-bootstrap";
import { BsFillLightningFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Paths } from "../App";
import { useAuth } from "../contexts/AuthContext";
import { animateClick } from "../utils/AnimationSettings";
import { fetchRandomDefaultTask } from "../utils/ApiRequests";
import { Types } from "./ExerciseFilter";

type QuickTaskButtonProps = {
  imageStyle: React.CSSProperties;
  buttonStyle: React.CSSProperties;
};

// return button which starts random default task
function QuickTaskButton({ imageStyle, buttonStyle }: QuickTaskButtonProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <motion.div {...animateClick}>
      <Button variant="outline-dark" onClick={handleClick} style={buttonStyle}>
        <BsFillLightningFill style={imageStyle} />
        <div className="mt-2">QUICK TASK</div>
      </Button>
    </motion.div>
  );

  async function handleClick() {
    const randomTask = await fetchRandomDefaultTask(user).then((task) => {
      return task;
    });
    // Navigate based on task type
    if (
      randomTask.type === Types.CONNECT_PAIRS_TI ||
      randomTask.type === Types.CONNECT_PAIRS_TT
    ) {
      console.log(randomTask.type);
      navigate(Paths.Connect, {
        state: { taskId: randomTask.id, taskType: randomTask.type },
      });
    } else {
      console.log(randomTask);
      navigate(Paths.FourChoices, {
        state: { taskId: randomTask.id, taskType: randomTask.type },
      });
    }
  }
}

export default QuickTaskButton;
