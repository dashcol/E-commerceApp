import { Navigate } from "react-router-dom";
import { useValue } from "../Context/Context";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useValue();

  return isAuthenticated ? children : <Navigate to="/login" />;
}
