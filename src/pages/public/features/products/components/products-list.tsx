import { Tables } from "@/types/supabase-generated.types";
import RestaurantPorductCard from "./product-card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ProductList({
  products,
}: {
  products: Tables<"business_products">[] | undefined;
}) {
  if (!products || products.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center mt-4">
        Parece que aun no has agregado productos a tu empresa.
      </p>
    );
  }
  return (
    <div className="flex flex-col w-full my-2">
      <div className="flex rounded-t-md h-8 items-center bg-primary/20 flex-row w-full justify-between  text-sm font-semibold text-card-foreground gap-0.5">
        <p className="w-full px-2">Producto</p>
        <div className="flex max-w-[120px] justify-around w-full flex-row gap-0.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-center">Estado</p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm ">Estado del producto</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-center">Editar</p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Editar producto</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Separator></Separator>
      {products.map((product) => (
        <RestaurantPorductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductList;
