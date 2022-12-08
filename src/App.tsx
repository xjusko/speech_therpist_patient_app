import { Container } from "react-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
import BottomNavbar from "./navbars/BottomNavbar";
import TopNavbar from "./navbars/TopNavbar";
import AssignedExercisesTab from "./pages/tabs/AssignedExercisesTab";
import DefaultExercisesTab from "./pages/tabs/DefaultExercisesTab";
import ErrorPage from "./pages/404Page";
import Connect from "./pages/exercises/Connect";
import FourChoices from "./pages/exercises/FourChoices";
import ExerciseSummary from "./pages/exercises/ExerciseSummary";
import Login from "./pages/authentication/Login";
import UnexpectedError from "./pages/UnexpectedError";
import Register from "./pages/authentication/Register";
import TherapistProfile from "./pages/TherapistProfile";
import TherapistsTab from "./pages/tabs/TherapistsTab";
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
  UnexpectedError: "/unexpectederror",
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
            <Route path={Paths.TherapistsTab} element={<TherapistsTab />} />
            <Route
              path={Paths.TherapistProfile}
              element={<TherapistProfile />}
            />
            {/* Duplicate landing page path to work on default url on the first load of the page */}
            <Route
              path={Paths.DefaultExercisesTab}
              element={<DefaultExercisesTab />}
            />
            <Route path="/" element={<DefaultExercisesTab />} />
            <Route
              path={Paths.AssignedExercisesTab}
              element={<AssignedExercisesTab />}
            />
            <Route path={Paths.ExerciseSummary} element={<ExerciseSummary />} />
            <Route path={Paths.UserSettings} element={<UserSettings />} />
          </Route>
        </Route>
        <Route path={Paths.UnexpectedError} element={<UnexpectedError />} />
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
