import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, getUser } = useAppContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [getUser, user]);
  

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRoute;
