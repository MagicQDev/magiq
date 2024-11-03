import { useEffect } from "react";
import { useUserCompanyStore } from "@/stores/user.store";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import NavCompanySkeleton from "./app/skeleton/nav-company-skeleton";
import BusinessSwitcher from "./app/skeleton/business-switcher";
import useFetchNav from "@/hooks/use-nav";
import { useSidebar } from "./ui/sidebar";
import ArrowNav from "@/assets/up-arrow-nav.png"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Plus } from "lucide-react";

function NavCompany() {
  const user = useUserCompanyStore((state) => state.user);
  const companies = useUserCompanyStore((state) => state.companies);
  const setCompanies = useUserCompanyStore((state) => state.setCompanies);
  const activeCompany = useUserCompanyStore((state) => state.activeCompany);
  const setActiveCompany = useUserCompanyStore(
    (state) => state.setActiveCompany
  );
  const {
    open,
    setOpen,
  } = useSidebar()
  const { data, isLoading, isPending, error } = useFetchNav({ owner_id: user?.id });

  useEffect(() => {
    if (data && !error) {
      console.log({ data });
      setCompanies(data);
      setActiveCompany(data[0]);
    }
  }, [data]);

  if (error) {

  }
  return isLoading || isPending ? (
    <NavCompanySkeleton></NavCompanySkeleton>
  ) : companies.length > 0 ? (
    activeCompany != null && <BusinessSwitcher></BusinessSwitcher>
  ) : (
    <>
      <Button size={open ? "default" : "icon"} className="w-full mb-2" asChild onClick={() => setOpen(false)}>
        <Link title="Crear empresa" to="/company">{open ? "Crea tu negocio!" :
          <Plus></Plus>}
        </Link>
      </Button>
      <div className={`${!open ? 'hidden' : 'flex flex-row w-full mx-3 md:mx-0'}`}>
        <p className="font-normal text-left text-sm italic w-full mt-5 md:mt-6 md:w-3/4">Continua con el registro de tu emprendimiento!</p>
        <img src={ArrowNav} alt="arrow up" className="absolute right-8 md:right-3 w-12 md:14"
          style={{ transform: "scaleX(-1)" }}></img>
      </div>
    </>


  );
}

export default NavCompany;
