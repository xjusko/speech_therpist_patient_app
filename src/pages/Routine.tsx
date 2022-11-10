import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import ChooseTaskCard from "../components/ChooseTaskCard";
import { useAuth } from "../contexts/AuthContext";
import { fetchMyProfile } from "../utils/ApiRequests";
import { BasicTaskInfo } from "../utils/CommonTypes";

function Routine() {
  const [types, setTypes] = useState([1, 2]);
  const [difficulties, setDIfficulties] = useState(["easy", "hard"]);
  const { user } = useAuth();
  const [myTasks, setMyTasks] = useState<BasicTaskInfo[]>();
  // Get tasks assigned to the user
  useEffect(() => {
    fetchMyProfile(user).then((profile) => {
      setMyTasks(profile.assigned_tasks);
    });
  }, []);

  if (!myTasks) {
    return <div> </div>;
  }

  // Filter tasks based on chosen type
  const filteredData = myTasks.filter(
    (task) =>
      types.includes(task.type) && difficulties.includes(task.difficulty)
  );

  return (
    <div>
      <div className="d-flex flex-column mx-4 my-5">
        <div className="d-flex fs-1 font-uppercase fw-bold justify-content-center mb-5">
          Assigned tasks
        </div>
        {/* Filter buttons */}
        <ToggleButtonGroup
          className="gap-1 my-1"
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
        <ToggleButtonGroup
          className="gap-1 my-1"
          type="checkbox"
          value={difficulties}
          onChange={(value) => setDIfficulties(value)}
        >
          <ToggleButton
            id="easy"
            value="easy"
            variant="outline-dark"
            style={{ width: "40vw", borderRadius: "5px" }}
          >
            EASY
          </ToggleButton>
          <ToggleButton
            id="hard"
            value="hard"
            variant="outline-dark"
            style={{ width: "40vw", borderRadius: "5px" }}
          >
            HARD
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div>
        <div>
          {/* Render assigned tasks */}
          <AnimatePresence>
            {filteredData &&
              filteredData.map((item) => (
                <ChooseTaskCard key={item.id} {...item} />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Routine;
