import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tables } from "@/types/supabase-generated.types";
import { maskedPrice } from "@/utils/funtions";
import { useState } from "react";

function RestaurantPorductCard({
  product,
}: {
  product: Tables<"business_products">;
}) {
  const [isActive, setIsActive] = useState(product.is_active);

  const handleEdit = () => {};
  const handleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      key={product.id}
      className="flex flex-row justify-between items-center w-full border-b border-muted py-2"
    >
      <div className="flex flex-row items-center">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-14 h-14 object-cover rounded-md"
          ></img>
        )}
        <div className="flex flex-col ml-2">
          <p className="text-sm font-bold">{product.name}</p>
          <p className="text-muted-foreground text-xs">{product.description}</p>
          <p className="text-sm font-bold mr-4 text-card-foreground">
            {maskedPrice(product.price)}
          </p>
        </div>
      </div>
      <div className="max-h-14 h-full">
        <div className="flex flex-row gap-1 h-full">
          <div className="grid grid-rows-2 h-full gap-0.5 place-content-around">
            <span className="text-muted-foreground text-xs text-center">
              {isActive ? "Activo" : "Inactivo"}
            </span>
            <Switch checked={isActive} onCheckedChange={handleActive}></Switch>
          </div>
          <div className="flex flex-col  gap-0.5">
            <span className="text-muted-foreground text-xs text-center">
              Editar
            </span>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              Editar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantPorductCard;
