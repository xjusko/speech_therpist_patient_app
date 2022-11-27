import { motion } from "framer-motion";
import { Nav, Navbar as BsNavbar } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { HiFire } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import { Paths } from "../App";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { animateClick } from "../utils/AnimationSettings";
import { fetchTaskResults } from "../utils/ApiRequests";

function TopNavbar() {
  const { user } = useAuth();
  const { profileData } = useProfile();

  const { data: results, error } = useSWR("navbar", () =>
    fetchTaskResults(user)
  );

  if (!results) {
    return <div></div>;
  }

  const completedTaskIds = results
    .filter((result) => result.answered_by === profileData.id)
    .map((result) => result.task);
  const assignedTasksIds = profileData.assigned_tasks.map((task) => task.id);
  const countTasksToDo = assignedTasksIds.filter(
    (id) => !completedTaskIds.includes(id)
  ).length;
  return (
    <BsNavbar
      fixed="top"
      expand="sm"
      className="d-flex shadow-sm"
      style={{
        backgroundColor: "#ddd",
        borderBottom: "1px solid grey",
      }}
    >
      <BsNavbar.Collapse>
        <BsNavbar.Brand className="fs-1 fw-bold mx-3">
          Speech Therapist
        </BsNavbar.Brand>
      </BsNavbar.Collapse>
      <div className="d-flex mx-3">
        <HiFire color="red" style={{ height: "3rem", width: "3rem" }} />
        <div className="fs-4">{profileData.day_streak}</div>
      </div>
      <div className="d-flex mx-3">
        <BsBell style={{ height: "3rem", width: "3rem" }} />
        <div className="fs-4">{countTasksToDo}</div>
      </div>
      <Nav.Link to={Paths.UserSettings} as={NavLink} className="d-flex mx-3">
        <motion.img
          layout
          {...animateClick}
          src={profileData.image}
          style={{
            height: "3rem",
            width: "3rem",
            borderRadius: "50%",
            border: "2px solid black",
          }}
        />
      </Nav.Link>
    </BsNavbar>
  );
}

export default TopNavbar;
