import { useEffect } from "react";
import { useUserBusinessStore } from "@/stores/user.store";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import NavCompanySkeleton from "../app/nav-company-skeleton";
import BusinessSwitcher from "../app/business-switcher";
import useFetchNav from "@/hooks/use-nav";
import { useSidebar } from "../ui/sidebar";
import ArrowNav from "@/assets/up-arrow-nav.webp";
import { Plus } from "lucide-react";

function NavCompany({
  showSidebarMessage,
  hideSidebarMessage,
}: {
  showSidebarMessage: boolean;
  hideSidebarMessage: () => void;
}) {
  const user = useUserBusinessStore((state) => state.user);
  const companies = useUserBusinessStore((state) => state.companies);
  const activeCompany = useUserBusinessStore((state) => state.activeCompany);

  const { open, setOpen, setOpenMobile, isMobile, openMobile } = useSidebar();
  const { isLoading, isPending } = useFetchNav({
    owner_id: user?.id,
  });

  const onCrearNegocioClick = () => {
    setOpen(false);
    setOpenMobile(false);
    hideSidebarMessage();
  };
  if (isLoading || isPending) {
    return <NavCompanySkeleton></NavCompanySkeleton>;
  }

  if (companies.length > 0 && activeCompany != null) {
    return <BusinessSwitcher></BusinessSwitcher>;
  }
  const validateIsOpen = () => {
    return isMobile ? openMobile : open;
  };
  return (
    <div className="p-2">
      <Button
        size={open ? "default" : "icon"}
        className={`${validateIsOpen() ? "w-full mb-2" : ""}`}
        asChild
        onClick={onCrearNegocioClick}
      >
        <Link title="Crear empresa" to="/business/create">
          {validateIsOpen() ? "Crea tu negocio!" : <Plus></Plus>}
        </Link>
      </Button>
      <div
        className={`${
          !validateIsOpen() || !showSidebarMessage
            ? "hidden"
            : "flex flex-row w-full mx-3 md:mx-0"
        }`}
      >
        <p className="font-normal text-left text-sm italic w-full mt-5 md:mt-6 md:w-3/4">
          Continua con el registro de tu emprendimiento!
        </p>
        <img
          src={ArrowNav}
          alt="arrow up"
          className="absolute right-8 md:right-3 w-12 md:14"
          style={{ transform: "scaleX(-1)" }}
        ></img>
      </div>
    </div>
  );
}

export default NavCompany;
