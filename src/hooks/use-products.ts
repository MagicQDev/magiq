import {
  fetchAllProductsByBusiness,
  saveProduct,
} from "@/services/products/products.service";
import { Tables } from "@/types/supabase-generated.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = (business_id: string | undefined) => {
  return useQuery({
    queryKey: ["produts_by_business", business_id],
    queryFn: async () => {
      if (!business_id) return;
      return await fetchAllProductsByBusiness(business_id);
    },
    retry() {
      return false;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: !!business_id,
  });
};

export const useUpdateProduct = async (
  product: Tables<"business_products">
) => {
  return useMutation({
    mutationKey: ["update_product"],
    mutationFn: async () => {
      return await saveProduct(product);
    },
    onSuccess(data, _variables, _context) {
      console.log("Product updated", data);
    },
  });
};

export const useAddProduct = async (product: Tables<"business_products">) => {
  return useMutation({
    mutationKey: ["add_product"],
    mutationFn: async () => {
      return await saveProduct(product);
    },
    onSuccess(data, _variables, _context) {
      console.log("Product added", data);
    },
  });
};
