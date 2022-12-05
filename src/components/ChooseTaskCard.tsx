import { motion, useIsPresent } from "framer-motion";
import { Nav, Stack } from "react-bootstrap";
import { BsCheckLg } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { Paths } from "../App";
import { BasicTaskInfo } from "../utils/CommonTypes";
import { Types } from "./ExerciseFilter";

// Basic card to be shown for listing tasks.
function ChooseTaskCard({ id, name, type, difficulty, isDone }: BasicTaskInfo) {
  // animations properties
  const isPresent = useIsPresent();
  const animations = {
    layout: true,
    initial: "out",
    animate: isPresent ? "in" : "out",
    variants: {
      in: { scale: 1, opacity: 1 },
      out: { scale: 0, opacity: 0 },
    },
    transition: { ease: [0.17, 0.55, 0.55, 1], duration: 0.2 },
    whileTap: { scale: 0.9 },
  };
  const shortenedType =
    type === Types.FOUR_CHOICES_IT || type === Types.FOUR_CHOICES_TI
      ? "Choose"
      : "Connect";
  return (
    // Navigating based on task type

    <motion.div
      {...animations}
      className="w-100 my-2 shadow-sm"
      style={{
        border: "3px solid rgba(0, 0, 0, .3)",
        borderRadius: "1rem",
      }}
    >
      <Nav.Link
        state={{ taskId: id, taskType: type }}
        to={
          type === Types.CONNECT_PAIRS_TI || type === Types.CONNECT_PAIRS_TT
            ? Paths.Connect
            : Paths.FourChoices
        }
        as={NavLink}
      >
        {/* Main content */}
        <Stack
          direction="horizontal"
          gap={2}
          className="d-flex align-items-center text-dark mx-2 my-2"
        >
          <div
            style={{
              fontSize: "1.2rem",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </div>

          <div className="ms-auto text-center d-flex align-items-center">
            {isDone && (
              <BsCheckLg
                color="green"
                style={{ minWidth: "30px", minHeight: "30px" }}
              />
            )}
            <Stack style={{ fontSize: "0.9rem" }}>
              <div>{difficulty}</div>
              <div>{shortenedType}</div>
            </Stack>
          </div>
        </Stack>
      </Nav.Link>
    </motion.div>
  );
}
export default ChooseTaskCard;
