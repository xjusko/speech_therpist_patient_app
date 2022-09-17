import React from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";

type TherapistCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  location: string;
  imageUrl: string;
};

function FindTherapistCard(props: TherapistCardProps) {
  return (
    <Button className="w-100" variant="outline-dark">
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center text-dark"
      >
        <img
          src={props.imageUrl}
          height="100px"
          width="100px"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        ></img>
        <div className="me-auto fs-5">
          <div>
            {props.firstName} {props.lastName}
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          <div>{props.location}</div>
        </div>
      </Stack>
    </Button>
  );
}

export default FindTherapistCard;
