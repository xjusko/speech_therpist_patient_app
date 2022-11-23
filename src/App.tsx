import { Container } from "react-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import AssignedExercisesTab from "./pages/AssignedExercisesTab";
import DefaultExercisesTab from "./pages/DefaultExercisesTab";
import ErrorPage from "./pages/ErrorPage";
import Connect from "./pages/Exercises/Connect";
import FourChoices from "./pages/Exercises/FourChoices";
import ExerciseSummary from "./pages/ExerciseSummary";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TherapistProfile from "./pages/TherapistProfile";
import TherapistsTab from "./pages/TherapistsTab";
import UserSettings from "./pages/UserSettings";
import AuthRequired from "./utils/AuthRequired";

export const Paths = {
  TherapistsTab: "/therapists",
  TherapistProfile: "/therapist",
  DefaultExercisesTab: "/defaultexercises",
  AssignedExercisesTab: "/assignedexercises",
  ExerciseSummary: "/exercisesummary",
  UserSettings: "/usersettings",
  Connect: "/questionconnect",
  FourChoices: "/questionfourchoices",
  Register: "/register",
  Login: "/login",
};

function App() {
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
            <Route path="/" element={<DefaultExercisesTab />} />
            <Route path={Paths.TherapistsTab} element={<TherapistsTab />} />
            <Route
              path={Paths.TherapistProfile}
              element={<TherapistProfile />}
            />
            <Route
              path={Paths.DefaultExercisesTab}
              element={<DefaultExercisesTab />}
            />
            <Route
              path={Paths.AssignedExercisesTab}
              element={<AssignedExercisesTab />}
            />
            <Route path={Paths.ExerciseSummary} element={<ExerciseSummary />} />
            <Route path={Paths.UserSettings} element={<UserSettings />} />
          </Route>
        </Route>
        <Route path="/*" element={<ErrorPage />} />
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
