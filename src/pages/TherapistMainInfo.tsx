import React from "react";
import { Card, Nav, NavLink } from "react-bootstrap";
import { useParams } from "react-router-dom";
import storeItems from "../data/therapists.json";

function TherapistMainInfo() {
  const { id } = useParams();
  const therapist = storeItems.find((i) => i.id === Number(id));
  return (
    <div className="mx-4">
      <div className="d-flex mt-1">
        <Nav.Link href="/findtherapist" as={NavLink}>
          <svg
            style={{ width: "3rem", height: "3rem", opacity: "50%" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
          </svg>
        </Nav.Link>
        <Nav.Link href="/" as={NavLink} className="ms-auto">
          <svg
            style={{ width: "3rem", height: "3rem", opacity: "50%" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
          </svg>
        </Nav.Link>
      </div>
      <Card
        style={{ background: "none", border: "none" }}
        className="mt-1 text-dark"
      >
        <Card.Img
          src={therapist?.imageUrl}
          style={{ objectFit: "fill", height: "45vh" }}
        />
        <Card.Body>
          <Card.Title className="d-flex align-items-center">
            {therapist?.firstName} {therapist?.lastName}
            <span className="ms-auto" style={{ fontSize: "0.85rem" }}>
              {therapist?.email}
            </span>
          </Card.Title>
          <Card.Subtitle className="my-2 d-flex align-items-center">
            {therapist?.location}
            {", "}
            {therapist?.city}
            <span className="ms-auto" style={{ fontSize: "0.85rem" }}>
              {therapist?.phone}
            </span>
          </Card.Subtitle>
          <hr style={{ opacity: "1", height: "1px" }} className="text-dark" />
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TherapistMainInfo;
