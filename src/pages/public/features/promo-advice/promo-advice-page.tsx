import { useState } from "react";
import Title from "@/components/app/title";
import SubTitle from "@/components/app/subtitle";
import InstagramLogo from "@/assets/instagram-white-logo.png";
import { Separator } from "@/components/ui/separator";
import GeneratorForm from "./components/generator-form";
import { cn } from "@/lib/utils";
const AdviceGenerator: React.FC = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const showForm = () => {
    setFormVisible(true);
  };
  return (
    <div className="w-full">
      <Title>Asistente de redes sociales</Title>
      <SubTitle>
        Genera descripciones promocionales para tus campañas en redes sociales.
      </SubTitle>
      <Separator></Separator>
      <div className="flex justify-center my-4">
        <div
          className={cn(
            "flex justify-center gap-2 items-center h-48 p-4 rounded-md bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-center font-semibold duration-300 ease-in-out transform hover:scale-110 cursor-pointer",
            formVisible && "hidden"
          )}
          onClick={showForm}
        >
          <img className="w-8" src={InstagramLogo} alt="Instagram-logo" />
          Instagram post
        </div>
        <GeneratorForm visible={formVisible}></GeneratorForm>
      </div>
    </div>
  );
};

export default AdviceGenerator;
