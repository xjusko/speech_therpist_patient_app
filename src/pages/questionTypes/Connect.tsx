import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { DropResult } from "react-beautiful-dnd";
import data from "../../data/tasks.json";
import ConnectDraggableColumn from "../../components/ConnectDraggableColumn";

type Question = {
  id: number;
  text: string;
};

function Connect() {
  const { id } = useParams();
  const task = data.tasks.find((i) => i.id === id);
  if (!task) return <div></div>;

  const [questions, setQuestions] = useState({
    firstOptions: task.questions[0].firstOptions,
    secondOptions: task.questions[0].secondOptions,
  });

  const reorder = (list: Question[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function handleDragLeft(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      questions.firstOptions,
      result.source.index,
      result.destination.index
    );
    setQuestions((prev) => ({
      ...prev,
      firstOptions: items,
    }));
  }

  function handleDragRight(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      questions.secondOptions,
      result.source.index,
      result.destination.index
    );
    setQuestions((prev) => ({
      ...prev,
      secondOptions: items,
    }));
  }
  return (
    <div className="mx-4 my-5">
      <div className="fs-1 fw-bold font-monospace text-center ">
        Pair by dragging
      </div>
      <Stack
        direction="horizontal"
        className="gap-2 my-4 text-center justify-content-center"
      >
        <ConnectDraggableColumn
          questions={questions.firstOptions}
          handleDrag={handleDragLeft}
        />
        <ConnectDraggableColumn
          questions={questions.secondOptions}
          handleDrag={handleDragRight}
        />
      </Stack>
      <div className="text-center">
        <Button variant="dark" size="lg">
          Next
        </Button>
      </div>
    </div>
  );
}

export default Connect;
