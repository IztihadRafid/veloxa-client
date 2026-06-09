import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import Logo from "@/CustomComponents/Logo";
import useRole from "@/hooks/useRole";
import {
    FaCheckCircle,
  FaHistory,
  FaHome,
  FaMotorcycle,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { MdAssignment, MdDashboard, MdDirectionsBike } from "react-icons/md";
import { NavLink } from "react-router";

export function AppSidebar() {
  const { role } = useRole();

  const commonLinks = [
    {
      icon: FaHome,
      label: "Home",
      href: "/",
    },
    {
      icon: MdDashboard,
      label: "Dashboard",
      href: "/dashboard",
      ignoreActive: true,
    },
    {
      icon: FaShoppingBag,
      label: "My Parcels",
      href: "/dashboard/my-parcels",
    },
    {
      icon: FaHistory,
      label: "Payment History",
      href: "/dashboard/payment-history",
    },
   
  ];

  const adminLinks = [
    {
      icon: FaMotorcycle,
      label: "Approve Riders",
      href: "/dashboard/approve-riders",
    },
    {
      icon: MdDirectionsBike,
      label: "Assign Riders",
      href: "/dashboard/assign-riders",
    },
    {
      icon: FaUser,
      label: "Users Management",
      href: "/dashboard/users-management",
    },
  ];
  const riderLinks = [
    {
      icon: MdAssignment,
      label: "Assign Deliveries",
      href: "/dashboard/assign-deliveries",
    },
    {
      icon: FaCheckCircle,
      label: "Completed Deliveries",
      href: "/dashboard/completed-deliveries",
    }
  ];
  // console.log(role)
  const sidebarLinks =
  role?.role === "admin"
    ? [...commonLinks, ...adminLinks]
    : role?.role === "rider"
    ? [...commonLinks, ...riderLinks]
    : commonLinks; 

  return (
    <Sidebar>
      <SidebarContent className="bg-green-50">
        {/* Logo */}
        <div className="p-4">
          <Logo />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-1 px-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => {
                  const active = !link.ignoreActive && isActive; //  ignore dashboard

                  return `
                    flex items-center gap-4 px-4 py-2 my-2 rounded-[15px] duration-200
                    hover:bg-green-600 hover:text-white
                    ${active ? "bg-green-600 text-white" : "text-[#56bd1f]"}
                  `;
                }}
              >
                <Icon size={22} className="text-inherit" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
