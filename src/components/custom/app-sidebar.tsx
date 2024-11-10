import { NavMain } from "@/components/custom/nav-main";
import { NavUser } from "@/components/custom/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import NavCompany from "./nav-business";
import useFetchNav from "@/hooks/use-nav";
import { useUserBusinessStore } from "@/stores/user.store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUserBusinessStore((state) => state.user);
  const [showSidebarMessage, setShowSidebarMessage] = useState(false);
  const { pathname } = useLocation();

  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const { data, error } = useFetchNav({ owner_id: user?.id });
  useEffect(() => {
    if (data && !error) {
      if (data.length < 1 && pathname === "/") {
        setShowSidebarMessage(true);
        if (isMobile) {
          setOpenMobile(true);
        }
      } else if (pathname === "/business/create" && data.length < 1) {
        setShowSidebarMessage(false);
        setOpen(false);
        setOpenMobile(false);
      }
    }
  }, [data, error]);
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader className="p-0">
        <SidebarMenu className="items-center">
          <SidebarMenuItem className="p-2 md:p-0 w-full">
            <NavCompany
              showSidebarMessage={showSidebarMessage}
              hideSidebarMessage={() => setShowSidebarMessage(false)}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
