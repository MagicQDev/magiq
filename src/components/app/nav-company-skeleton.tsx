import { useSidebar } from "@/components/ui/sidebar";

function NavCompanySkeleton() {
  const { open } = useSidebar();
  return (
    <div className={`flex ${open ? "gap-1 p-2" : "p-0"} justify-center`}>
      <div className="size-8 bg-foreground/40 rounded-sm animate-pulse" />
      {open &&
        <div className="flex flex-col ml-2 gap-1">
          <div className="size-4 bg-foreground/40 rounded-sm animate-pulse w-36" />
          <div className="size-3 bg-foreground/40 rounded-sm animate-pulse w-24" />
        </div>
      }
    </div>
  );
}

export default NavCompanySkeleton;
