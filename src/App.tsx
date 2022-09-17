import React from "react";
import { Container } from "react-bootstrap";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import FindTherapist from "./pages/FindTherapist";
import TherapistMainInfo from "./pages/TherapistMainInfo";

function App() {
  return (
    <Container style={{ maxWidth: "700px" }}>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findtherapist" element={<FindTherapist />} />
        <Route path="/therapist/:id" element={<TherapistMainInfo />} />
      </Routes>
    </Container>
  );
}

export default App;
