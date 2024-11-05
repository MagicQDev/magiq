import { AppSidebar } from "@/components/custom/app-sidebar";
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
import LoadingPage from "./public/features/loading";
import MLogo from "@/assets/M.png";

export default function Layout() {
  const setUser = useUserCompanyStore((state) => state.setUser);
  const user = useUserCompanyStore((state) => state.user);
  const wait = (ms: number, execute: () => void) =>
    new Promise(() => setTimeout(execute, ms));
  const { isFetching, isLoading } = useFetchNav({ owner_id: user?.id });

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
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {!user || isFetching || isLoading ? (
              <div className="h-4 w-28 bg-foreground/40 animate-pulse rounded-sm"></div>
            ) : (
              <h1 className=" font-sans text-sm font-normal text-pretty text-gray-500">
                Bienvenido, {user?.name}
              </h1>
            )}
            <div className="block">
              <img
                src={MLogo}
                alt="logo"
                className="absolute right-2 top-2 size-12 rounded-full"
              ></img>
            </div>
          </div>
        </header>
        <main className="flex flex-1 self-center flex-col pt-0 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 h-full">
          <section className="px-6 md:px-0">
            <Outlet></Outlet>
          </section>
          <LoadingPage visible={!user || isFetching || isLoading} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
