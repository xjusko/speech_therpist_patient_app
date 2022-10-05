import React from "react";
import { Container } from "react-bootstrap";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import FindTherapist from "./pages/FindTherapist";
import TherapistMainInfo from "./pages/TherapistMainInfo";
import TaskMenu from "./pages/TaskMenu";
import Connect from "./pages/questionTypes/Connect";
import TaskFinishScreen from "./pages/TaskFinishScreen";
import FourChoices from "./pages/questionTypes/FourChoices";
import Routine from "./pages/Routine";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRequired from "./components/AuthRequired";

function App() {
  return (
    <AuthProvider>
      <Container style={{ maxWidth: "700px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthRequired />}>
            <Route path="/" element={<Menu />} />
            <Route path="/findtherapist" element={<FindTherapist />} />
            <Route path="/therapist/:id" element={<TherapistMainInfo />} />
            <Route path="/taskmenu" element={<TaskMenu />} />
            <Route path="/routine" element={<Routine />} />
            <Route path="/questionconnect/:id" element={<Connect />} />
            <Route path="/questionfourchoices/:id" element={<FourChoices />} />
            <Route path="/taskfinish/:qid" element={<TaskFinishScreen />} />
          </Route>
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
