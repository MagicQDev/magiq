import { TablesUpdate } from "@/types/supabase-generated.types";
import RestaurantPorductCard from "./product-card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetProducts } from "../hooks/use-get-products";

function ProductList({
  businessId,
  openForm,
}: {
  businessId: string;
  openForm: (
    initialValues: TablesUpdate<"business_products"> | undefined,
    isNew: boolean
  ) => void;
}) {
  const { data: products } = useGetProducts(businessId);
  const onEditClick = (product: TablesUpdate<"business_products">) => {
    openForm(product, false);
  };

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
        <RestaurantPorductCard
          product={product}
          key={product.id}
          onEdit={onEditClick}
        />
      ))}
    </div>
  );
}

export default ProductList;
