import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ChooseTaskCard, { BasicTaskInfo } from "../components/ChooseTaskCard";
import { useAuth } from "../contexts/AuthContext";
import { BackArrowIcon } from "../utils/CommonIcons";

function Routine() {
  const { user } = useAuth();
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
  return (
    <div>
      <div className="d-flex mx-4">
        <Nav.Link to="/" as={NavLink}>
          <BackArrowIcon />
        </Nav.Link>
      </div>
      <div className="d-flex flex-column mx-4 my-5">
        <div className="d-flex fs-1 font-monospace fw-bold justify-content-center mb-2">
          Assigned tasks
        </div>
        <div>
          <AnimatePresence>
            {tasks.length !== 0 ? (
              tasks.map((item) => <ChooseTaskCard key={item.id} {...item} />)
            ) : (
              <div>
                Unfortunately, your therapist have not assigned any task to you.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Routine;
