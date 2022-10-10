import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsFillLightningFill } from "react-icons/bs";

function QuickTaskButton({
  imageStyle,
  buttonStyle,
  children,
}: {
  imageStyle: React.CSSProperties;
  buttonStyle: React.CSSProperties;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  function handleClick() {
    const easyTasks = [].filter((item) => item.difficulty === "easy");
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
    <Button variant="outline-dark" onClick={handleClick} style={buttonStyle}>
      <BsFillLightningFill style={imageStyle} />
      <div>{children}</div>
    </Button>
  );
}

export default QuickTaskButton;
