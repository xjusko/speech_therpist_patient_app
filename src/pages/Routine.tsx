import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import ChooseTaskCard from "../components/ChooseTaskCard";
import { useAuth } from "../contexts/AuthContext";
import { fetchMyProfile } from "../utils/ApiRequests";
import { BackArrowIcon } from "../utils/CommonIcons";
import { BasicTaskInfo } from "../utils/TaskTypes";

function Routine() {
  const { user } = useAuth();
  const [myTasks, setMyTasks] = useState<BasicTaskInfo[]>();
  // Get tasks assigned to the user
  useEffect(() => {
    fetchMyProfile(user).then((profile) => {
      setMyTasks(profile.assigned_tasks);
    });
  }, []);

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
          {/* Render assigned tasks */}
          <AnimatePresence>
            {myTasks &&
              myTasks.map((item) => <ChooseTaskCard key={item.id} {...item} />)}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Routine;
