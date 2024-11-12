import { AppSidebar } from "@/components/custom/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useFetchNav from "@/hooks/use-nav";
import { useUserBusinessStore } from "@/stores/user.store";
import { Outlet } from "react-router-dom";
import MLogo from "@/assets/M.png";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import LoadingApp from "./public/features/loading";
import SuspenseApp from "@/components/app/suspense";

export default function Layout() {
  const setUser = useUserBusinessStore((state) => state.setUser);
  const setCompanies = useUserBusinessStore((state) => state.setCompanies);
  const setActiveCompany = useUserBusinessStore(
    (state) => state.setActiveCompany
  );
  const user = useUserBusinessStore((state) => state.user);
  const wait = (ms: number, execute: () => void) =>
    new Promise(() => setTimeout(execute, ms));
  const {
    data: companies,
    isFetching,
    isLoading,
    isError,
  } = useFetchNav({ owner_id: user?.id });
  const globalFetch = useIsFetching();
  const isMutating = useIsMutating();


  useEffect(() => {
    if (companies && !isError) {
      setCompanies(companies);
      setActiveCompany(companies[0]);
    }
  }, [companies]);
  useEffect(() => {
    //798e7d40-4b65-4b83-9ea8-614c4a5e181d
    wait(5000, () => {
      setUser({
        id: "798e7d40-4b65-4b83-9ea8-614c4a5e181d",
        name: "Emer Arteaga",
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
              <h1 className="text-sm font-normal text-pretty text-gray-500">
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
        <main className="flex flex-1 self-center flex-col pt-0 w-full md:w-4/5 lg:w-9/12 xl:w-7/12 2xl:w-5/12 h-full">
          <section className="px-6 md:px-0 h-full">
            <Suspense fallback={<SuspenseApp />}>
              <Outlet></Outlet>
            </Suspense>
          </section>
        </main>
        {(globalFetch > 0 ||
          isMutating > 0 ||
          !user ||
          isFetching ||
          isLoading) && <LoadingApp />}
      </SidebarInset>
    </SidebarProvider>
  );
}
