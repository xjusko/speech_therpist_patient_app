import React from "react";
import { Reorder } from "framer-motion";
import { BsCheckLg, BsXLg } from "react-icons/bs";

type Choice = {
  id: number;
  text: string;
  image: string;
};

type SetChoices = {
  (value: React.SetStateAction<Choice[] | undefined>): void;
  (value: React.SetStateAction<Choice[] | undefined>): void;
  (newOrder: any[]): void;
};

type ConnectColumnProps = {
  choices: Choice[];
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
    <Reorder.Group
      axis="y"
      values={choices}
      onReorder={setChoices}
      style={{ padding: "0" }}
    >
      {choices.map((item, index) => (
        <Reorder.Item
          key={item.id}
          value={item}
          style={{
            listStyle: "none",
            mixBlendMode: "multiply",
            fontSize: "1rem",
          }}
        >
          <Choice isCorrect={answer && answer[index]}>
            {isImage ? (
              <img
                src={item.image}
                alt="image"
                draggable={false}
                height="100%"
                width="100%"
                style={{ borderRadius: "10px" }}
              />
            ) : (
              <div className="fw-bold text-uppercase">{item.text}</div>
            )}
          </Choice>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

function Choice({
  isCorrect,
  children,
}: {
  isCorrect: boolean | null;
  children: React.ReactNode;
}) {
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
      {children}
      {isCorrect != null &&
        (isCorrect ? (
          <BsCheckLg
            color="green"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: "20%",
            }}
          />
        ) : (
          <BsXLg
            color="red"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: "20%",
            }}
          />
        ))}
    </div>
  );
}
