import { motion, useIsPresent } from "framer-motion";
import { Nav, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BasicTaskInfo } from "../utils/TaskTypes";

// Basic card to be shown for listing tasks.
function ChooseTaskCard({ id, name, type, difficulty }: BasicTaskInfo) {
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
  };
  return (
    // Navigating based on task type
    <Nav.Link
      to={`/${type === 1 ? "questionconnect" : "questionfourchoices"}/${id}`}
      as={NavLink}
    >
      <motion.div
        {...animations}
        className="w-100 my-1"
        style={{
          position: isPresent ? "static" : "absolute",
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "1rem",
        }}
      >
        {/* Main content */}
        <Stack
          direction="horizontal"
          gap={2}
          className="d-flex align-items-center text-dark mx-2 my-2 text-uppercase"
        >
          <div className="me-auto fs-5">{name}</div>
          <div className="text-center">
            <div>{type}</div>
            <div>{difficulty}</div>
          </div>
        </Stack>
      </motion.div>
    </Nav.Link>
  );
}
export default ChooseTaskCard;
