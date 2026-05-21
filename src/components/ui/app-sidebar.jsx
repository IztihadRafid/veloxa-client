import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import Logo from "@/CustomComponents/Logo";
import { FaHistory, FaHome, FaMotorcycle, FaShoppingBag, FaTruck } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { NavLink } from "react-router";

export function AppSidebar() {
  const sidebarLinks = [
    {
      icon: <FaHome color="#56bd1f" size={"22px"} />,
      label: "Home",
      href: "/",
    },
    {
      icon: <MdDashboard color="#56bd1f" size={"22px"} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <FaShoppingBag color="#56bd1f" size={"22px"} />,
      label: "My Parcels",
      href: "/dashboard/my-parcels",
    },
    {
      icon: <FaHistory color="#56bd1f" size={"22px"} />,
      label: "Payment History",
      href: "/dashboard/payment-history",
    },
    {
      icon: <FaMotorcycle color="#56bd1f" size={"22px"} />,
      label: "Approve Riders",
      href: "/dashboard/approve-riders",
    },
    {
      icon: <SlSettings color="#56bd1f" size={"22px"} />,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        {/* Your navigation links go here */}
        <div className="p-4">
          <Logo></Logo>
        </div>

        {sidebarLinks.map((link) => (
          <NavLink
            to={link.href}
            key={link.href}
            href={link.href}
            className={
              "flex justify-start hover:bg-green-600 hover:p-2 rounded-[15px] hover:text-white duration-150 items-center gap-4 px-4"
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
