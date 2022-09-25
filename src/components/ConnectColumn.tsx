import React from "react";
import { Reorder } from "framer-motion";

type Options = {
  id: number;
  text: string;
};

type SetOptions = {
  (value: React.SetStateAction<{ id: number; text: string }[]>): void;
  (value: React.SetStateAction<{ id: number; text: string }[]>): void;
  (newOrder: any[]): void;
};

export function ConnectColumn(options: Options[], setOptions: SetOptions) {
  return (
    <Reorder.Group
      axis="y"
      values={options}
      onReorder={setOptions}
      style={{ padding: "0" }}
    >
      {options.map((item) => (
        <Reorder.Item key={item.id} value={item} style={{ listStyle: "none" }}>
          <Choice>{item.text}</Choice>
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
