import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import Logo from "@/CustomComponents/Logo";
import useRole from "@/hooks/useRole";
import {
  FaHistory,
  FaHome,
  FaMotorcycle,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
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
      ignoreActive: true, // 👈 add this flag
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
    {
      icon: SlSettings,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  const adminLinks = [
    {
      icon: FaMotorcycle,
      label: "Approve Riders",
      href: "/dashboard/approve-riders",
    },
    {
      icon: FaUser,
      label: "Users Management",
      href: "/dashboard/users-management",
    },
  ];

  const sidebarLinks =
    role?.role === "admin"
      ? [...commonLinks, ...adminLinks]
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
                  const active =
                    !link.ignoreActive && isActive; //  ignore dashboard

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