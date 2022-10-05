import React, { useState } from "react";
import { Nav, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { BackArrowIcon } from "../utils/CommonIcons";
import data from "../data/tasks.json";
import ChooseTaskCard from "../components/ChooseTaskCard";
import { AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

function TaskMenu() {
  const [difficulties, setDifficulties] = useState(["easy", "hard"]);
  const [types, setTypes] = useState(["1", "2"]);
  const filteredData = data.tasks.filter(
    (item) =>
      difficulties.includes(item.difficulty) && types.includes(item.type)
  );
  return (
    <div className="d-flex flex-column gap-4 mx-4">
      <div className="d-flex">
        <Nav.Link to="/" as={NavLink}>
          <BackArrowIcon />
        </Nav.Link>
      </div>
      <div className="text-center text-monospace fs-1 fw-bold text-uppercase mb-5">
        Choose exercise
      </div>
      <ToggleButtonGroup
        className="gap-1"
        type="checkbox"
        value={difficulties}
        onChange={(value) => setDifficulties(value)}
      >
        <ToggleButton
          id="diff-1"
          value={"easy"}
          variant="outline-dark"
          style={{ width: "40vw", borderRadius: "5px" }}
        >
          EASY
        </ToggleButton>
        <ToggleButton
          id="diff-2"
          value={"hard"}
          variant="outline-dark"
          style={{ width: "40vw", borderRadius: "5px" }}
        >
          HARD
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        className="gap-1"
        type="checkbox"
        value={types}
        onChange={(value) => setTypes(value)}
      >
        <ToggleButton
          id="type-1"
          value={"1"}
          variant="outline-dark"
          style={{ width: "40vw", borderRadius: "5px" }}
        >
          CONNECT SIX
        </ToggleButton>
        <ToggleButton
          id="type-2"
          value={"2"}
          variant="outline-dark"
          style={{ width: "40vw", borderRadius: "5px" }}
        >
          FOUR CHOICES
        </ToggleButton>
      </ToggleButtonGroup>

      <div>
        <AnimatePresence>
          {filteredData.length !== 0 ? (
            filteredData.map((item) => (
              <ChooseTaskCard key={Number(item.id)} {...item} />
            ))
          ) : (
            <div>Unfortunately, no results</div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
export default TaskMenu;
