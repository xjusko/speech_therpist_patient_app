import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import ChooseTaskCard from "../components/ChooseTaskCard";
import { FilterGroup, Types } from "../components/FilterGroup";
import QuickTaskButton from "../components/QuickTaskButton";
import { useAuth } from "../contexts/AuthContext";
import { fetchDefaultTasks } from "../utils/ApiRequests";
import { BasicTaskInfo } from "../utils/CommonTypes";

function TaskMenu() {
  const { user } = useAuth();
  const [types, setTypes] = useState(Object.values(Types));
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
      <div className="text-center fs-1 fw-bold mb-2">
        <div className="mb-3">Choose Exercise</div>
        <QuickTaskButton
          imageStyle={{ width: "4rem", height: "4rem" }}
          buttonStyle={{
            width: "8rem",
            height: "8rem",
            border: "none",
          }}
        />
      </div>

      {/* Filter buttons */}
      <FilterGroup
        values={types}
        setValues={setTypes}
        filters={Object.values(Types)}
      />
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
