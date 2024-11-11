import SubTitle from "@/components/app/subtitle";
import Title from "@/components/app/title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function KitchenPage() {
  return (
    <div className="w-full">
      <Title>Mi cocina</Title>
      <SubTitle>
        Administra, crea y edita los pedidos de tu restaurante
      </SubTitle>
      <Separator></Separator>
      <div className="flex w-full py-2 justify-end md:justify-around">
        <Button>Nuevo pedido</Button>
      </div>
    </div>
  );
}

export default KitchenPage;
