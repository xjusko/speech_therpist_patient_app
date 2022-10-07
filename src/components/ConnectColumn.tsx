import React from "react";
import { Reorder } from "framer-motion";

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
};

export function ConnectColumn({
  choices,
  setChoices,
  isImage,
}: ConnectColumnProps) {
  return (
    <Reorder.Group
      axis="y"
      values={choices}
      onReorder={setChoices}
      style={{ padding: "0" }}
    >
      {choices.map((item) => (
        <Reorder.Item key={item.id} value={item} style={{ listStyle: "none" }}>
          <Choice>{isImage ? item.text : item.text}</Choice>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

function Choice({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center my-1"
      style={{
        height: "35vw",
        width: "40vw",
        border: "3px solid black",
        maxWidth: "290px",
        maxHeight: "250px",
      }}
    >
      {children}
    </div>
  );
}
