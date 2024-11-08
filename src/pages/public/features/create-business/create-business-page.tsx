import SubTitle from "@/components/app/subtitle";
import Title from "@/components/app/title";
import { Separator } from "@radix-ui/react-separator";
import RegisterBusinessForm from "./components/business-form";

function CreateBusinessPage() {
  return (
    <>
      <Title>Crear negocio</Title>
      <SubTitle>
        Completa el formulario para cargar un nuevo negocio al sistema
      </SubTitle>
      <Separator></Separator>
      <div className="mt-6 w-full">
        <RegisterBusinessForm></RegisterBusinessForm>
      </div>
    </>
  );
}
export default CreateBusinessPage;
