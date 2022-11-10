import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Nav, Navbar as BsNavbar } from "react-bootstrap";
import { IconType } from "react-icons";
import { FaUserMd } from "react-icons/fa";
import { GiNotebook, GiWhiteBook } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

function BottomNavbar() {
  const { profileData } = useProfile();
  const animationProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };
  const location = useLocation();
  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);
  const [selected, setSelected] = useState("/taskmenu");
  return (
    <BsNavbar
      className="d-flex text-center shadow-sm justify-content-around"
      fixed="bottom"
      expand="md"
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
        navigateTo={
          profileData.assignment_active
            ? `/therapist/${profileData.assigned_to}`
            : "/findtherapist"
        }
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
          style={{ color: selected === navigateTo ? "black" : "grey" }}
        >
          <Icon
            style={{
              height: "75px",
              width: "75px",
            }}
          />
          <BsNavbar.Collapse className="fw-bold" style={{ width: "50px" }}>
            {collapseText}
          </BsNavbar.Collapse>
        </motion.div>
      </Nav.Link>
    );
  }
}

export default BottomNavbar;
