import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const { auth, children } = props;
  console.log("Protect check:", auth);

  // If not auth
  if (auth === false) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoutes;
