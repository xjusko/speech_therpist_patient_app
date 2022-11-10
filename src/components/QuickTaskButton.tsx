import { motion } from "framer-motion";
import React from "react";
import { Button } from "react-bootstrap";
import { BsFillLightningFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { fetchRandomDefaultTask } from "../utils/ApiRequests";

type QuickTaskButtonProps = {
  imageStyle: React.CSSProperties;
  buttonStyle: React.CSSProperties;
};

// return button which starts random default task
function QuickTaskButton({ imageStyle, buttonStyle }: QuickTaskButtonProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
    if (randomTask.type === 1) {
      navigate(`/questionconnect/${randomTask.id}`);
      return;
    } else {
      navigate(`/questionfourchoices/${randomTask.id}`);
      return;
    }
  }
}

export default QuickTaskButton;
