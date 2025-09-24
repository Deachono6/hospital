import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // ยังไม่ล็อกอิน → ส่งไปหน้า Login
    return <Navigate to="/Login" replace />;
  }
  return children;
};

export default ProtectedRoute;