import { useInView } from "framer-motion";
import { useRef } from "react";
import { Nav, Stack } from "react-bootstrap";
import { BsGeoAltFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

type TherapistCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  location: string;
  imageUrl: string;
};

function FindTherapistCard({
  id,
  firstName,
  lastName,
  location,
  imageUrl,
}: TherapistCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    // Clicking anywhere on card navigates to therapist page.
    <Nav.Link to={`/therapist/${id}`} as={NavLink}>
      <div
        ref={ref}
        className="w-100 my-1"
        style={{
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "1rem",
          // animation properties
          opacity: isInView ? 1 : 0,
          transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
        }}
      >
        {/* Main content */}
        <Stack
          direction="horizontal"
          gap={2}
          className="d-flex align-items-center text-dark mx-2 my-2"
        >
          {/* Profile picture */}
          <img
            src={imageUrl}
            height="100px"
            width="100px"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          ></img>
          <div className="me-auto fs-5">
            <div>
              {firstName} {lastName}
            </div>
          </div>
          <div className="text-center">
            <BsGeoAltFill />
            <div>{location}</div>
          </div>
        </Stack>
      </div>
    </Nav.Link>
  );
}

export default FindTherapistCard;
