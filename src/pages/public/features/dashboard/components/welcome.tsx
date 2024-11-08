import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <section className="flex subpixel-antialiased  flex-col justify-center items-center w-full h-[90%]">
      <h1 className="text-2xl font-title uppercase font-extrabold text-card-foreground">
        Bienvenido
      </h1>
      <p className="text-md font-body subpixel-antialiased leading-snug tracking-normal font-normal text-center pt-2">
        Para nosotros es un orgullo tenerte aquí, continua con la configuración
        y explora!
      </p>
      <Button
        variant="ghost"
        className="mt-4 font-bold text-card-foreground hover:bg-card-foreground hover:text-white"
        onClick={() => navigate("/business/create")}
      >
        Continuar <ArrowRight />
      </Button>
    </section>
  );
}

export default Welcome;
