import { motion } from "framer-motion";
import { Nav, Navbar as BsNavbar } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { HiFire } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

function TopNavbar() {
  const { profileData } = useProfile();

  if (!profileData) {
    return <div></div>;
  }
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
        <BsNavbar.Brand className="fs-1 fw-bold mx-2">
          Speech Therapist
        </BsNavbar.Brand>
      </BsNavbar.Collapse>
      <Nav.Link to="/taskmenu" as={NavLink} className="d-flex mx-2">
        <HiFire color="red" style={{ height: "3rem", width: "3rem" }} />
        <div className="fs-4">3</div>
      </Nav.Link>
      <Nav.Link to="/routine" as={NavLink} className="d-flex mx-2">
        <BsBell style={{ height: "3rem", width: "3rem" }} />
        <div className="fs-4">12</div>
      </Nav.Link>
      <Nav.Link to="/account" as={NavLink} className="d-flex mx-2">
        <motion.img
          layout
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{ scale: 0.7 }}
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
