import { motion, useIsPresent } from "framer-motion";
import React from "react";
import { NavLink, Stack } from "react-bootstrap";

type ChooseTaskCardProps = {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  questions: Array<any>;
};

function ChooseTaskCard({ id, name, type, difficulty }: ChooseTaskCardProps) {
  const isPresent = useIsPresent();
  const animations = {
    layout: true,
    initial: "out",
    animate: isPresent ? "in" : "out",
    variants: {
      in: { scale: 1, opacity: 1 },
      out: { scale: 0, opacity: 0 },
    },
    transition: { ease: "easeInOut", duration: 0.2 },
  };
  return (
    <NavLink
      href={`/${
        type === "1" ? "questionconnect" : "questionfourchoices"
      }/${id}`}
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
    </NavLink>
  );
}
export default ChooseTaskCard;
