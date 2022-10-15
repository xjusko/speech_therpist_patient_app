import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Nav, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import ChooseTaskCard from "../components/ChooseTaskCard";
import { useAuth } from "../contexts/AuthContext";
import { fetchDefaultTasks } from "../utils/ApiRequests";
import { BackArrowIcon } from "../utils/CommonIcons";
import { BasicTaskInfo } from "../utils/TaskTypes";

function TaskMenu() {
  const { user } = useAuth();
  const [types, setTypes] = useState([1, 2]);
  const [tasks, setTasks] = useState<BasicTaskInfo[]>();

  useEffect(() => {
    fetchDefaultTasks(user).then((data) => setTasks(data));
  }, []);

  if (!tasks) {
    return <div> </div>;
  }

  // Filter tasks based on chosen type
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

      {/* Filter buttons */}
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
          {/* Render filtered tasks */}
          {filteredData ? (
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
