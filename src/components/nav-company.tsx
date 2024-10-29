import { BriefcaseBusiness, ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";
import { useEffect } from "react";
import { Company } from "@/types/company.types";
import { useUserCompanyStore } from "@/stores/user.store";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function NavCompany() {
  const user = useUserCompanyStore((state) => state.user);
  const userLoading = useUserCompanyStore((state) => state.userLoading);
  const companyLoading = useUserCompanyStore((state) => state.companyLoading);
  const companies = useUserCompanyStore((state) => state.companies);
  const setCompanies = useUserCompanyStore((state) => state.setCompanies);
  const activeCompany = useUserCompanyStore((state) => state.activeCompany);
  const setActiveCompany = useUserCompanyStore(
    (state) => state.setActiveCompany
  );

  useEffect(() => {
    if (user && !userLoading) {
      setCompanies(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userLoading]);

  return userLoading || companyLoading ? (
    <div className="flex gap-1 p-2">
      <div className="size-8 bg-foreground/40 rounded-sm animate-pulse" />
      <div className="flex flex-col ml-2 gap-1">
        <div className="size-4 bg-foreground/40 rounded-sm animate-pulse w-36" />
        <div className="size-3 bg-foreground/40 rounded-sm animate-pulse w-24" />
      </div>
    </div>
  ) : companies.length > 0 ? (
    activeCompany != null && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {activeCompany.logo_url ? (
                <img src={activeCompany.logo_url} className="size-4" />
              ) : (
                <BriefcaseBusiness className="size-4"></BriefcaseBusiness>
              )}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {activeCompany.name}
              </span>
              <span className="truncate text-xs">
                {activeCompany?.company_type.name}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Mis negocios
          </DropdownMenuLabel>
          {companies.map((company: Company, index) => (
            <DropdownMenuItem
              key={company.name}
              onClick={() => setActiveCompany(company)}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                {activeCompany.logo_url ? (
                  <img src={activeCompany.logo_url} />
                ) : (
                  <BriefcaseBusiness></BriefcaseBusiness>
                )}
              </div>
              {company.name}
              <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 p-2">
            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus className="size-4" />
            </div>
            <div className="font-medium text-muted-foreground">Agregar</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  ) : (
    <Button className="w-full" asChild>
      <Link to="/company">Crea tu negocio!</Link>
    </Button>
  );
}

export default NavCompany;
