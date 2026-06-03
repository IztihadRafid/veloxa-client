import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";

import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  console.log(role)
  if (loading || roleLoading) {
    return <Spinner></Spinner>;
  }

  if (role.role !== "admin") {
    return <Navigate to={"/login"}></Navigate>
  }
  return children;
};

export default AdminRoute;
