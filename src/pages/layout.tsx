import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useFetchNav from "@/hooks/use-nav";
import { useUserCompanyStore } from "@/stores/user.store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const setUser = useUserCompanyStore((state) => state.setUser);
  const user = useUserCompanyStore((state) => state.user);
  const wait = (ms: number, execute: () => void) =>
    new Promise(() => setTimeout(execute, ms));
  useFetchNav({ owner_id: user?.id });


  useEffect(() => {
    wait(5000, () => {
      setUser({
        id: "798e7d40-4b65-4b83-9ea8-614c4a5e181d",
        name: "John Doe",
        email: "emer@gmail.com",
      });
    });
  }, []);


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className=" font-sans font-semibold text-pretty">
              Bienvenido, {user?.name}
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet></Outlet>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
