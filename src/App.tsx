import React from "react";
import { Container } from "react-bootstrap";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";

function App() {
  return (
    <Container style={{ maxWidth: "600px", height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
}

export default App;
