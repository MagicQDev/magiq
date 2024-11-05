import { BriefcaseBusiness, ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import { CompanyByOwnerId } from "@/types/business.types";
import { useUserCompanyStore } from "@/stores/user.store";

function BusinessSwitcher() {
  const companies = useUserCompanyStore((state) => state.companies);
  const activeCompany = useUserCompanyStore((state) => state.activeCompany);
  const setActiveCompany = useUserCompanyStore(
    (state) => state.setActiveCompany
  );
  const { open, openMobile } = useSidebar();
  return (
    activeCompany && (
      <DropdownMenu>
        <div className="flex flex-col items-center">
          <DropdownMenuTrigger
            asChild
            className={`${openMobile || open ? "w-full" : "w-auto"}`}
          >
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
              <div
                className={`${
                  openMobile || open
                    ? "grid flex-1 text-left text-sm leading-tight"
                    : "hidden"
                }`}
              >
                <span className="truncate font-semibold">
                  {activeCompany.name}
                </span>
                <span className="truncate text-xs">
                  {activeCompany?.business_type.name}
                </span>
              </div>
              {openMobile || (open && <ChevronsUpDown className="ml-auto" />)}
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
            {companies.map((company: CompanyByOwnerId, index) => (
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
        </div>
      </DropdownMenu>
    )
  );
}

export default BusinessSwitcher;
