import { Spinner } from "@/components/ui/spinner";
import useRole from "@/hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <Spinner></Spinner>;
  }
  if (role?.role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  }
  if (role?.role === "rider") {
    return <RiderDashboardHome></RiderDashboardHome>;
  }
  if (role?.role === "user") {
    return <UserDashboardHome></UserDashboardHome>;
  }
};

export default DashboardHome;
