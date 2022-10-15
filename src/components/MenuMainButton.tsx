import { Button, Col, Nav } from "react-bootstrap";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

export const mainButtonStyle = {
  height: "40vw",
  width: "40vw",
  maxHeight: "250px",
  maxWidth: "250px",
  border: "none",
  borderRadius: "2rem",
};
export const mainIconStyle = {
  height: "30vw",
  width: "30vw",
  maxHeight: "200px",
  maxWidth: "200px",
};

function MenuMainButton({
  Icon,
  buttonText,
  navigateTo,
}: {
  Icon: IconType;
  buttonText: string;
  navigateTo: string;
}) {
  return (
    <Col>
      <Nav.Link to={navigateTo} as={NavLink}>
        <Button variant="outline-dark" style={mainButtonStyle}>
          <Icon style={mainIconStyle} />
          <div className="mt-2">{buttonText}</div>
        </Button>
      </Nav.Link>
    </Col>
  );
}

export default MenuMainButton;
