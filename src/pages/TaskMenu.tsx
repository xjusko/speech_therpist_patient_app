import React, { useState } from "react";
import { Nav, NavLink, Form } from "react-bootstrap";
import { BackArrowIcon } from "../utils/CommonIcons";
import data from "../data/tasks.json";
import ChooseTaskCard from "../components/ChooseTaskCard";

function TaskMenu() {
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const filteredData = data.tasks.filter(
    (item) => item.difficulty.includes(difficulty) && item.type.includes(type)
  );
  return (
    <div className="d-flex flex-column gap-4 mx-4">
      <div className="d-flex">
        <Nav.Link href="/" as={NavLink}>
          <BackArrowIcon />
        </Nav.Link>
      </div>
      <div className="text-center text-monospace fs-1 fw-bold text-uppercase mb-5">
        Choose exercise
      </div>
      <Form.Select size="lg" onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">--Select difficulty--</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </Form.Select>

      <Form.Select size="lg" onChange={(e) => setType(e.target.value)}>
        <option value="">--Select type--</option>
        <option value="1">First</option>
        <option value="2">Second</option>
        <option value="3">Third</option>
      </Form.Select>
      <div>
        {filteredData.length !== 0 ? (
          filteredData.map((item) => (
            <ChooseTaskCard key={Number(item.id)} {...item} />
          ))
        ) : (
          <div>Unfortunately, no results</div>
        )}
      </div>
    </div>
  );
}
export default TaskMenu;
