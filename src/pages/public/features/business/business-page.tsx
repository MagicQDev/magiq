import SubTitle from "@/components/app/subtitle";
import Title from "@/components/app/title";
import { Separator } from "@/components/ui/separator";

function CompanyPage() {
  return (
    <>
      <Title>Mis negocios</Title>
      <SubTitle>Listado de negocios registrados hasta la fecha</SubTitle>
      <Separator></Separator>
      <div className="mt-6 w-full">
        <p>aqui van los negocios listados</p>
      </div>
    </>
  );
}

export default CompanyPage;
