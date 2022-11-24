import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { Paths } from "../App";
import ChooseTaskCard from "../components/ChooseTaskCard";
import { FilterGroup, Types } from "../components/FilterGroup";
import FilterOffcanvas from "../components/FilterOffcanvas";
import Notification from "../components/Notification";
import QuickTaskButton from "../components/QuickTaskButton";
import { useAuth } from "../contexts/AuthContext";
import { fetchDefaultTasks } from "../utils/ApiRequests";

function DefaultExercisesTab() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [types, setTypes] = useState(Object.values(Types));

  const { data: tasks, error } = useSWR(
    "defaultTasks",
    () => fetchDefaultTasks(user),
    {
      onError() {
        navigate(Paths.OfflinePage);
      },
    }
  );

  if (!tasks) {
    return <div></div>;
  }

  // Filter tasks based on chosen type
  const filteredData = tasks.filter((task) => types.includes(task.type));

  return (
    <div className="d-flex flex-column mx-4">
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

      <FilterOffcanvas>
        {/* Filter buttons */}
        <div className="fs-2 fw-bold mb-2">Types</div>
        <FilterGroup
          values={types}
          setValues={setTypes}
          filters={Object.values(Types)}
        />
      </FilterOffcanvas>

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
export default DefaultExercisesTab;
