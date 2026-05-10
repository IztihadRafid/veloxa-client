import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <SidebarProvider  className={"w-full"}>
        <AppSidebar  className={"w-1/6"}>
          
        </AppSidebar>
        <main  className={"w-5/6"}>
          <SidebarTrigger />
          <Outlet></Outlet>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
