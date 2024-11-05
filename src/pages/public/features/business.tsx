import SubTitle from "@/components/app/subtitle";
import Title from "@/components/app/title";
import { useUserCompanyStore } from "@/stores/user.store";
import RegisterBusinessForm from "./components/business-form";
import { Separator } from "@/components/ui/separator";

function CompanyPage() {
  const companies = useUserCompanyStore((state) => state.companies);

  const titleMsg =
    companies.length < 1 ? "Crear empresa / negocio" : "Tus empresas";
  const subTitle =
    companies.length < 1
      ? "Completa el formulario para empezar a mejorar tu negocio"
      : "Estos son tus negocios registrados";
  return (
    <>
      <Title>{titleMsg}</Title>
      <SubTitle>{subTitle}</SubTitle>
      <Separator></Separator>
      <div className="mt-6 w-full">
        <RegisterBusinessForm></RegisterBusinessForm>
      </div>
    </>
  );
}

export default CompanyPage;
