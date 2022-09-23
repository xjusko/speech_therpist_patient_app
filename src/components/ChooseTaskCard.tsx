import React from "react";
import { Nav, NavLink, Stack } from "react-bootstrap";

type ChooseTaskCardProps = {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  questions: Array<any>;
};

function ChooseTaskCard({ id, name, type, difficulty }: ChooseTaskCardProps) {
  return (
    <Nav.Link href={`/questionconnect/${id}`} as={NavLink}>
      <div
        className="w-100 my-1"
        style={{
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "1rem",
        }}
      >
        <Stack
          direction="horizontal"
          gap={2}
          className="d-flex align-items-center text-dark mx-2 my-2 text-uppercase"
        >
          <div className="me-auto fs-5">{name}</div>
          <div className="text-center">
            <div>{type}</div>
            <div>{difficulty}</div>
          </div>
        </Stack>
      </div>
    </Nav.Link>
  );
}
export default ChooseTaskCard;
