import SubTitle from "@/components/app/subtitle";
import Title from "@/components/app/title";
import { Separator } from "@radix-ui/react-separator";
import RegisterBusinessForm from "./components/business-form";
import { useState } from "react";
import SuccessMessage from "./components/success-message";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserBusinessStore } from "@/stores/user.store";
import { BusinessByOwnerId } from "@/types/business.types";

function CreateBusinessPage() {
  const [successPopup, setSuccessPopup] = useState(false);
  const companies = useUserBusinessStore((state) => state.companies);
  const [newCompany, setNewCompany] = useState<BusinessByOwnerId | null>(null);
  const setCompanies = useUserBusinessStore((state) => state.setCompanies);
  const { toast } = useToast();
  const navigate = useNavigate();

  const showErrorToast = () => {
    toast({
      title: "Error al crear negocio",
      description:
        "Ocurrió un error al crear el negocio, por favor intenta de nuevo",
      variant: "destructive",
      duration: 5000,
    });
  };

  const onSuccess = (data: BusinessByOwnerId[]) => {
    const newData = companies.concat(data);
    setNewCompany(data[0]);
    setCompanies(newData);
    setSuccessPopup(true);
  };

  return (
    <>
      <Title>Crear negocio</Title>
      <SubTitle>
        Completa el formulario para cargar un nuevo negocio al sistema
      </SubTitle>
      <Separator></Separator>
      <div className="mt-6 w-full">
        <RegisterBusinessForm
          onSuccess={onSuccess}
          onError={showErrorToast}
        ></RegisterBusinessForm>
      </div>
      <SuccessMessage
        isOpen={successPopup}
        createdCompany={newCompany}
        onClose={(isOpen) => {
          if (isOpen === false) {
            setSuccessPopup(false);
            navigate("/");
          }
        }}
      ></SuccessMessage>
    </>
  );
}
export default CreateBusinessPage;
