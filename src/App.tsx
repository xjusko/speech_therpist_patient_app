import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Register from "./pages/Register";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import FindTherapist from "./pages/FindTherapist";
import TherapistMainInfo from "./pages/TherapistMainInfo";
import TaskMenu from "./pages/TaskMenu";
import Connect from "./pages/questionTypes/Connect";
import TaskSummary from "./pages/TaskSummary";
import FourChoices from "./pages/questionTypes/FourChoices";
import Routine from "./pages/Routine";
import AuthRequired from "./utils/AuthRequired";
import Account from "./pages/Account";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import { useProfile } from "./contexts/ProfileContext";
import { fetchMyProfile } from "./utils/ApiRequests";
import { useAuth } from "./contexts/AuthContext";

export const Paths = {
  FindTherapist: "/findtherapist",
  TherapistMainInfo: "/therapist",
  TaskMenu: "/taskmenu",
  Routine: "/routine",
  TaskSummary: "/tasksummary",
  Account: "/account",
  Connect: "/questionconnect",
  FourChoices: "/questionfourchoices",
  Register: "/register",
  Login: "/login",
};

function App() {
  const { profileData, setProfileData } = useProfile();
  const { user } = useAuth();

  return (
    <Container style={{ maxWidth: "700px" }}>
      <Routes>
        {/* Pages accessible without authorization */}
        <Route path={Paths.Register} element={<Register />} />
        <Route path={Paths.Login} element={<Login />} />
        <Route element={<AuthRequired />}>
          {/* Pages accessible only when authorized */}
          <Route path={Paths.Connect} element={<Connect />} />
          <Route path={Paths.FourChoices} element={<FourChoices />} />
          <Route element={<PagesWithNavbars />}>
            <Route path="/" element={<TaskMenu />} />
            <Route path={Paths.FindTherapist} element={<FindTherapist />} />
            <Route
              path={Paths.TherapistMainInfo}
              element={<TherapistMainInfo />}
            />
            <Route path={Paths.TaskMenu} element={<TaskMenu />} />
            <Route path={Paths.Routine} element={<Routine />} />
            <Route path={Paths.TaskSummary} element={<TaskSummary />} />
            <Route path={Paths.Account} element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </Container>
  );
}

function PagesWithNavbars() {
  return (
    <div style={{ marginTop: "80px", marginBottom: "120px" }}>
      <TopNavbar />
      <BottomNavbar />
      <Outlet />
    </div>
  );
}

export default App;
