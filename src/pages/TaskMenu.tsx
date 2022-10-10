import React, { useEffect, useState } from "react";
import { Nav, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { BackArrowIcon } from "../utils/CommonIcons";
import ChooseTaskCard, { BasicTaskInfo } from "../components/ChooseTaskCard";
import { AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function TaskMenu() {
  const { user } = useAuth();
  const [types, setTypes] = useState([1, 2]);
  const [tasks, setTasks] = useState<BasicTaskInfo[]>();
  useEffect(() => {
    fetch("http://172.26.5.2/api/task/tasks/", {
      method: "GET",
      headers: { Authorization: `Token ${user}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  if (!tasks) {
    return <div> </div>;
  }

  const filteredData = tasks.filter((task) => types.includes(task.type));

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
        value={types}
        onChange={(value) => setTypes(value)}
      >
        <ToggleButton
          id="type-1"
          value={1}
          variant="outline-dark"
          style={{ width: "40vw", borderRadius: "5px" }}
        >
          CONNECT SIX
        </ToggleButton>
        <ToggleButton
          id="type-2"
          value={2}
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
              <ChooseTaskCard key={item.id} {...item} />
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
