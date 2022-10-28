import { motion } from "framer-motion";
import { useState } from "react";
import { Nav, Navbar as BsNavbar } from "react-bootstrap";
import { IconType } from "react-icons";
import { FaUserMd } from "react-icons/fa";
import { GiNotebook, GiWhiteBook } from "react-icons/gi";
import { NavLink } from "react-router-dom";

function BottomNavbar() {
  const animationProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };
  const [selected, setSelected] = useState("Default Tasks");
  return (
    <BsNavbar
      className="d-flex text-center shadow-sm justify-content-around"
      fixed="bottom"
      expand="sm"
      style={{
        backgroundColor: "#ddd",
        borderTop: "1px solid grey",
        maxHeight: "90px",
      }}
    >
      <BottomNavButton
        Icon={GiWhiteBook}
        navigateTo="/taskmenu"
        collapseText="Default Tasks"
      />

      <BottomNavButton
        Icon={GiNotebook}
        navigateTo="/routine"
        collapseText="Assigned Tasks"
      />
      <BottomNavButton
        Icon={FaUserMd}
        navigateTo="/findtherapist"
        collapseText="Therapist"
      />
    </BsNavbar>
  );

  function BottomNavButton({
    Icon,
    navigateTo,
    collapseText,
  }: {
    Icon: IconType;
    navigateTo: string;
    collapseText: string;
  }) {
    return (
      <Nav.Link as={NavLink} to={navigateTo}>
        <motion.div
          className="d-flex"
          {...animationProps}
          style={{ color: selected === collapseText ? "black" : "grey" }}
          onClick={() => setSelected(collapseText)}
        >
          <Icon
            style={{
              height: "75px",
              width: "75px",
            }}
          />
          <BsNavbar.Collapse className="fw-bold">
            {collapseText}
          </BsNavbar.Collapse>
        </motion.div>
      </Nav.Link>
    );
  }
}

export default BottomNavbar;
