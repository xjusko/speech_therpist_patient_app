import { AnimatePresence } from "framer-motion";
import React from "react";
import { NavLink } from "react-bootstrap";
import ChooseTaskCard from "../components/ChooseTaskCard";
import data from "../data/tasks.json";
import { BackArrowIcon } from "../utils/CommonIcons";

function Routine() {
  return (
    <div>
      <div className="d-flex mx-4">
        <NavLink href="/">
          <BackArrowIcon />
        </NavLink>
      </div>
      <div className="d-flex flex-column mx-4 my-5">
        <div className="d-flex fs-1 font-monospace fw-bold justify-content-center mb-2">
          Assigned tasks
        </div>
        <div>
          <AnimatePresence>
            {data.tasks.length !== 0 ? (
              data.tasks
                .slice(0, 4)
                .map((item) => (
                  <ChooseTaskCard key={Number(item.id)} {...item} />
                ))
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
