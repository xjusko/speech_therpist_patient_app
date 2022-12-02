import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { IoOptions } from "react-icons/io5";

// Offcanvas filter opening to 50% of height from top
function FilterOffcanvas({ children }: { children: JSX.Element[] }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div onClick={handleShow} style={{ cursor: "pointer" }}>
        <span className="d-flex align-items-center">
          <IoOptions size="2em" />
          FILTER
        </span>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="top"
        scroll={true}
        backdrop={true}
        style={{ background: "whitesmoke", height: "50%" }}
      >
        <Offcanvas.Header>
          <Offcanvas.Title className="fs-1 fw-bold">
            Exercise Filter
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="text-center">{children}</Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default FilterOffcanvas;
