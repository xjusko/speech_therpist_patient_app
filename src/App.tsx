import React from "react";
import { Container } from "react-bootstrap";
import Register from "./pages/Register";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import FindTherapist from "./pages/FindTherapist";
import TherapistMainInfo from "./pages/TherapistMainInfo";
import TaskMenu from "./pages/TaskMenu";
import Connect from "./pages/questionTypes/Connect";
import TaskSummary from "./pages/TaskSummary";
import FourChoices from "./pages/questionTypes/FourChoices";
import Routine from "./pages/Routine";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRequired from "./utils/AuthRequired";
import Account from "./pages/Account";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import { ProfileProvider } from "./contexts/ProfileContext";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Container style={{ maxWidth: "700px" }}>
          <Routes>
            {/* Pages accessible without authorization */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<AuthRequired />}>
              {/* Pages accessible only when authorized */}
              <Route path="/questionconnect/:id" element={<Connect />} />
              <Route path="/questionfourchoices" element={<FourChoices />} />
              <Route element={<PagesWithNavbars />}>
                <Route path="/" element={<TaskMenu />} />
                <Route path="/findtherapist" element={<FindTherapist />} />
                <Route path="/therapist/:id" element={<TherapistMainInfo />} />
                <Route path="/taskmenu" element={<TaskMenu />} />
                <Route path="/routine" element={<Routine />} />
                <Route path="/tasksummary" element={<TaskSummary />} />
                <Route path="/account" element={<Account />} />
              </Route>
            </Route>
          </Routes>
        </Container>
      </ProfileProvider>
    </AuthProvider>
  );
}

function PagesWithNavbars() {
  return (
    <div style={{ marginTop: "80px", marginBottom: "100px" }}>
      <TopNavbar />
      <BottomNavbar />
      <Outlet />
    </div>
  );
}

export default App;
