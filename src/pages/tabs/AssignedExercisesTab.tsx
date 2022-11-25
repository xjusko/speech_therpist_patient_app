import { AxiosError } from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { Paths } from "../../App";
import ChooseTaskCard from "../../components/ChooseTaskCard";
import {
  Difficulties,
  ExerciseFilter,
  Types,
} from "../../components/ExerciseFilter";
import FilterOffcanvas from "../../components/FilterOffcanvas";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/ProfileContext";
import { fetchMyProfile, fetchTaskResults } from "../../utils/ApiRequests";
import { AccountInfo } from "../../utils/CommonTypes";

function AssignedExercisesTab() {
  const [types, setTypes] = useState(Object.values(Types));
  const [difficulties, setDIfficulties] = useState(Object.values(Difficulties));
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profileData, setProfileData } = useProfile();
  // Get tasks assigned to the user
  const { data: profile } = useSWR<AccountInfo>(
    "profile",
    () => fetchMyProfile(user),
    {
      onSuccess(data) {
        setProfileData(data);
      },
      onError() {
        navigate(Paths.OfflinePage);
      },
    }
  );
  const { data: results } = useSWR("results", () => fetchTaskResults(user), {
    onError() {
      navigate(Paths.OfflinePage);
    },
  });

  if (!profile || !results) {
    return <div> </div>;
  }
  const completedTaskIds = results
    .filter((result) => result.answered_by === profileData.id)
    .map((result) => result.task);

  // Filter tasks based on chosen type
  const filteredTasks = profile.assigned_tasks.filter(
    (task) =>
      types.includes(task.type) && difficulties.includes(task.difficulty)
  );

  return (
    <div>
      <div style={{ opacity: profileData.assignment_active ? "100%" : "10%" }}>
        <div className="d-flex flex-column mx-4 mt-5">
          <div className="d-flex fs-1 font-uppercase fw-bold justify-content-center mb-5">
            Assigned Exercises
          </div>
          <FilterOffcanvas>
            {/* Filter buttons */}
            <div className="fs-2 fw-bold mb-2">Type</div>
            <ExerciseFilter
              values={types}
              setValues={setTypes}
              filters={Object.values(Types)}
            />
            <hr />
            <div className="fs-2 fw-bold my-2">Difficulty</div>
            <ExerciseFilter
              values={difficulties}
              setValues={setDIfficulties}
              filters={Object.values(Difficulties)}
            />
          </FilterOffcanvas>
        </div>

        <div className="mx-4">
          {/* Render assigned tasks */}
          <AnimatePresence>
            {filteredTasks &&
              filteredTasks.map((item) => (
                <ChooseTaskCard
                  key={item.id}
                  isDone={completedTaskIds?.includes(item.id)}
                  {...item}
                />
              ))}
          </AnimatePresence>
        </div>
      </div>
      {!profileData.assignment_active && <NotAssignedOverlay />}
    </div>
  );
}

export default AssignedExercisesTab;

function NotAssignedOverlay() {
  const navigate = useNavigate();
  return (
    <Stack
      gap={2}
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
        left: "0",
        top: "0",
      }}
    >
      <div className="text-center mb-5 mx-1 fs-1 fw-bold text-uppercase">
        You are not linked to a therapist
      </div>
      <Button
        size="lg"
        variant="outline-dark"
        className="fs-2 fw-bold text-uppercase"
        onClick={() => navigate(Paths.TherapistsTab)}
      >
        Find a Therapist
      </Button>
    </Stack>
  );
}
