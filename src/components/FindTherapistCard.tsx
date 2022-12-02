import { motion } from "framer-motion";
import { Nav, Stack } from "react-bootstrap";
import { BsGeoAltFill } from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Paths } from "../App";
import { TherapistProfileInfo } from "../utils/CommonTypes";

function FindTherapistCard({
  id,
  name,
  location,
  image,
}: TherapistProfileInfo) {
  return (
    // Clicking anywhere on card navigates to therapist page.
    <Nav.Link
      to={Paths.TherapistProfile}
      state={{ therapistId: id }}
      as={NavLink}
    >
      <motion.div
        // animation properties
        initial={{ opacity: 0.2 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-100 my-1"
        style={{
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "1rem",
        }}
      >
        {/* Main content */}
        <Stack
          direction="horizontal"
          gap={2}
          className="d-flex align-items-center text-dark mx-2 my-2"
        >
          {/* Profile picture */}
          {image ? (
            <img
              src={image}
              style={{
                borderRadius: "50%",
                height: "100px",
                width: "100px",
              }}
            />
          ) : (
            <FaUserMd
              style={{
                borderRadius: "50%",
                height: "100px",
                width: "100px",
              }}
            />
          )}
          <div className="me-auto fs-5">
            <div>{name}</div>
          </div>
          <div className="text-center">
            <BsGeoAltFill />
            <div>{location}</div>
          </div>
        </Stack>
      </motion.div>
    </Nav.Link>
  );
}

export default FindTherapistCard;
