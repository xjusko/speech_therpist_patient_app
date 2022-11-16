import { Reorder } from "framer-motion";
import React from "react";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { Pair } from "../utils/CommonTypes";

type SetChoices = {
  (value: React.SetStateAction<Pair[] | undefined>): void;
  (value: React.SetStateAction<Pair[] | undefined>): void;
  (newOrder: any[]): void;
};

type ConnectColumnProps = {
  choices: Pair[];
  setChoices: SetChoices;
  isImage: boolean;
  answer: boolean[] | null;
};

export function ConnectColumn({
  choices,
  setChoices,
  isImage,
  answer,
}: ConnectColumnProps) {
  return (
    // This makes the column orderable
    <Reorder.Group
      axis="y"
      values={choices}
      onReorder={setChoices}
      style={{ padding: "0" }}
    >
      {/* Rendering the choices */}
      {choices.map((item, index) => (
        <Reorder.Item
          key={item.id}
          value={item}
          style={{
            // Removing list artifacts
            listStyle: "none",
            // blending image background with page background
            mixBlendMode: "multiply",
            fontSize: "1rem",
          }}
        >
          {/* Render image or text box based on recieved type */}
          <PairChoice isCorrect={answer && answer[index]}>
            {isImage ? (
              <img
                src={item.data2}
                alt="image"
                draggable={false}
                height="100%"
                width="100%"
                style={{ borderRadius: "10px", objectFit: "cover" }}
              />
            ) : (
              <div className="fw-bold text-uppercase">{item.data1}</div>
            )}
          </PairChoice>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

function PairChoice({
  isCorrect,
  children,
}: {
  isCorrect: boolean | null;
  children: React.ReactNode;
}) {
  const answerIconStyle: any = {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: "30%",
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center my-1"
      style={{
        height: "35vw",
        width: "40vw",
        border: "1px solid black",
        borderRadius: "10px",
        maxWidth: "290px",
        maxHeight: "250px",
        position: "relative",
      }}
    >
      {/* Content of choice */}
      {children}
      {/* Displays tick or cross after submitting answer */}
      {isCorrect != null &&
        (isCorrect ? (
          <BsCheckLg color="green" style={answerIconStyle} />
        ) : (
          <BsXLg color="red" style={answerIconStyle} />
        ))}
    </div>
  );
}
