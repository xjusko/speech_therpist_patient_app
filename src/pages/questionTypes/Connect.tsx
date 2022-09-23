import React, { useState } from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { number } from "yup";
import data from "../../data/tasks.json";

type Question = {
  id: number;
  text: string;
};

type Questions = {
  firstOptions: Array<Question>;
  secondOptions: Array<Question>;
};

type ChoiceProps = {
  text: string;
  id: number;
  isLeft: boolean;
};

const array: number[] = [];

function Connect() {
  const [options, setOptions] = useState({
    leftIdsSelected: array,
    rightIdsSelected: array,
  });

  const { id } = useParams();
  const task = data.tasks.find((i) => i.id === id);
  if (!task) return <div></div>;
  const questions: Array<Questions> = task.questions;
  return (
    <div className="mx-4 my-5">
      <div className="fs-1 fw-bold font-monospace text-uppercase text-center">
        Connect
      </div>
      <Stack direction="horizontal" className="gap-2 my-4">
        {" "}
        <Stack direction="vertical" className="gap-2">
          {questions[0].firstOptions.map((item) => (
            <Choice key={item.id} text={item.text} id={item.id} isLeft={true} />
          ))}
        </Stack>
        <Stack direction="vertical" className="gap-2">
          {questions[0].secondOptions.map((item) => (
            <Choice
              key={item.id}
              text={item.text}
              id={item.id}
              isLeft={false}
            />
          ))}
        </Stack>
      </Stack>
      <div className="text-center">
        <Button variant="dark" size="lg">
          Next
        </Button>
      </div>
    </div>
  );

  function Choice({ text, id, isLeft }: ChoiceProps) {
    function handleClick() {
      if (isLeft) {
        setOptions((prev) => {
          if (prev.leftIdsSelected.includes(id)) {
            return {
              ...prev,
              leftIdsSelected: prev.leftIdsSelected.filter(
                (item) => item !== id
              ),
            };
          } else {
            return {
              ...prev,
              leftIdsSelected: [...prev.leftIdsSelected, id],
            };
          }
        });
      } else {
        setOptions((prev) => {
          if (prev.rightIdsSelected.includes(id)) {
            return {
              ...prev,
              rightIdsSelected: prev.rightIdsSelected.filter(
                (item) => item !== id
              ),
            };
          } else {
            return {
              ...prev,
              rightIdsSelected: [...prev.rightIdsSelected, id],
            };
          }
        });
      }
    }
    let borderColor;

    if (isLeft) {
      borderColor = selectBorderColor(
        getIndexOfId(id, options.leftIdsSelected)
      );
    } else {
      borderColor = selectBorderColor(
        getIndexOfId(id, options.rightIdsSelected)
      );
    }

    return (
      <div
        onClick={handleClick}
        className="d-flex align-items-center justify-content-center"
        style={{
          height: "20vh",
          border: `3px solid ${borderColor} `,
        }}
      >
        {text}
      </div>
    );
  }
}

function getIndexOfId(id: number, selectedIds: number[]) {
  return selectedIds.findIndex((item) => item === id);
}

function selectBorderColor(index: number) {
  switch (index) {
    case 0:
      return "blue";
    case 1:
      return "green";
    case 2:
      return "red";
    default:
      return "black";
  }
}

export default Connect;
