import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const token = Cookies.get("user_id");

  const location = useLocation();
  if (token === undefined) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default ProtectedRoute;
