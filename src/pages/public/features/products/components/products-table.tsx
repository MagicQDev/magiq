import { Tables } from "@/types/supabase-generated.types";

function ProductsTable({
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
}

export default ProductsTable;
