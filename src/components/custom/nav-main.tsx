import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Icon from "../app/icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useUserBusinessStore } from "@/stores/user.store";
import { Link } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import useFetchNav from "@/hooks/use-nav";
export function NavMain() {
  const activeCompany = useUserBusinessStore((state) => state.activeCompany);
  const user = useUserBusinessStore((state) => state.user);
  const { open } = useSidebar();
  const isFetching = useIsFetching();
  const { data } = useFetchNav({ owner_id: user?.id });

  if (isFetching || !data) {
    return (
      <>
        <div className="h-3 w-full"></div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index + "app"}
            className={`flex gap-1 ${
              open ? "mx-2.5 mt-2" : "mx-1 justify-center"
            }`}
          >
            <div
              className={`bg-foreground/40 rounded-full animate-pulse ${
                open ? "size-5" : "size-8"
              }`}
            />
            <div
              className={`${
                open
                  ? "size-5 bg-foreground/40 rounded-sm animate-pulse w-36"
                  : "hidden"
              }`}
            />
          </div>
        ))}
      </>
    );
  } else if (activeCompany) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
        <SidebarMenu>
          {user &&
            activeCompany &&
            activeCompany?.business_type.features
              .sort((a: any, b: any) => a.position - b.position)
              .map((item: any) => (
                <Collapsible
                  key={item.id}
                  asChild
                  defaultOpen={item.data.active}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.data.name}>
                      <Link to={item.data.app_url}>
                        <Icon
                          name={
                            (item.data
                              .icon as keyof typeof dynamicIconImports) ??
                            "sword"
                          }
                        />
                        <span>{item.data.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }
}
