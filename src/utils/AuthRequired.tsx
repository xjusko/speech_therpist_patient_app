import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "../App";
import { useAuth } from "../contexts/AuthContext";

// Prevents reaching page without authentication
function AuthRequired() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={Paths.Register} />;
}

export default AuthRequired;
