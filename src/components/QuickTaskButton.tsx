import React from "react";
import { Button } from "react-bootstrap";
import data from "../data/tasks.json";
import { useNavigate } from "react-router-dom";
import { BsFillLightningFill } from "react-icons/bs";

function QuickTaskButton({
  imageStyle,
  buttonStyle,
}: {
  imageStyle: React.CSSProperties;
  buttonStyle: React.CSSProperties;
}) {
  const navigate = useNavigate();
  function handleClick() {
    const easyTasks = data.tasks.filter((item) => item.difficulty === "easy");
    const randomTask = easyTasks[Math.floor(Math.random() * easyTasks.length)];
    if (randomTask.type === "1") {
      navigate(`/questionconnect/${randomTask.id}`);
      return;
    } else {
      navigate(`/questionfourchoices/${randomTask.id}`);
      return;
    }
  }
  return (
    <Button
      variant="outline-dark"
      className="text-uppercase fs-3"
      onClick={handleClick}
      style={buttonStyle}
    >
      <BsFillLightningFill style={imageStyle} />
    </Button>
  );
}

export default QuickTaskButton;
